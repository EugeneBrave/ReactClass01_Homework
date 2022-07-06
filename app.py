import os
import pickle
from os.path import exists
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options as OpsC
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options as OpsF
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.firefox import GeckoDriverManager
from webdriver_manager.chrome import ChromeDriverManager
import time

os.environ["GH_TOKEN"] = "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"


class Browser:
    def __init__(self, name):
        if name == "firefox":
            options = OpsF()
            options.add_argument("--no-sandbox")
            # options.add_argument("--headless")
            self.driver = webdriver.Firefox(
                service=Service(GeckoDriverManager().install()),
                options=options,
            )
        elif name == "chrome":
            coptions = OpsC()
            coptions.add_argument("--disable-notifications")
            self.driver = webdriver.Chrome(
                ChromeDriverManager().install(), chrome_options=coptions
            )
        self.driver.get("https://user.gamer.com.tw/login.php")
        timeout = 10
        self.wait = WebDriverWait(self.driver, timeout)


browser = Browser("firefox")
driver = browser.driver
wait = browser.wait


def login():
    global driver
    global wait
    if exists("cookies.pkl"):
        cookies = pickle.load(open("cookies.pkl", "rb"))
        for cookie in cookies:
            driver.add_cookie(cookie)
        driver.refresh()
    if "www.gamer.com.tw" not in driver.current_url:
        user = driver.find_element(By.NAME, "userid")
        user.send_keys("eugenebrave")
        pwd = driver.find_element(By.NAME, "password")
        pwd.send_keys("810715")
        pwd.send_keys(Keys.RETURN)
        try:
            wait.until(EC.presence_of_element_located((By.ID, "signin-btn")))
            pickle.dump(driver.get_cookies(), open("cookies.pkl", "wb"))
            print("登入成功")
            return True
        except Exception as e:
            print(e)
            return False
    else:
        return True


def signIn():
    global wait
    try:
        if login():
            signInBtn = wait.until(
                EC.presence_of_element_located((By.ID, "signin-btn"))
            )
            print(signInBtn.text)
            signInBtn.click()
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False


def rewardDouble():
    global wait
    try:
        if signIn():
            dailyboxBtn = wait.until(
                EC.presence_of_element_located(
                    (By.XPATH, "//button[contains(@class,'popup-dailybox__btn')]")
                )
            )
            print(dailyboxBtn.text)
            if dailyboxBtn.is_enabled():
                dailyboxBtn.click()
                dialogify = wait.until(
                    EC.presence_of_element_located(
                        (By.XPATH, "//div[contains(@class,'dialogify__body')]/p")
                    )
                )
                print(dialogify.text)
                if dialogify.text == "是否觀看廣告？":
                    submitBtn = wait.until(
                        EC.element_to_be_clickable(
                            (
                                By.XPATH,
                                "//button[contains(@class,'btn-primary') and @type='submit']",
                            )
                        )
                    )
                    submitBtn.click()
                    try:
                        videoAdUi = wait.until(
                            EC.presence_of_element_located((By.CLASS_NAME, "videoAdUi"))
                        )
                        if videoAdUi:
                            rewardResumebutton = wait.until(
                                EC.visibility_of_element_located(
                                    (By.CLASS_NAME, "rewardResumebutton")
                                )
                            )
                            if rewardResumebutton:
                                rewardResumebutton.click()
                    except:
                        pass
                    time.sleep(45)
            else:
                print("已領取雙倍巴幣")
    except Exception as e:
        print("發生不預期錯誤!!")
        print(e)


def finish():
    global driver
    driver.quit()


if __name__ == "__main__":
    rewardDouble()
    finish()
