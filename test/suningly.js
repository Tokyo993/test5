const { Builder, By, until } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

describe('Math Testing', function() {
  this.timeout(10000);
  let driver;

  before(async function() {
    driver = new Builder().forBrowser('firefox').build();
    await driver.get('http://suninjuly.github.io/math.html');
  });

  after(async function() {
    driver.quit();
  });

  it('Math Testing', async function() {
    let inputValueElement = await driver.findElement(By.id('input_value'));
    let inputValueText = await inputValueElement.getAttribute('innerHTML');
    let x = parseInt(inputValueText);

    const y = Math.log(Math.abs(12 * Math.sin(x)));
    await driver.findElement(By.id('answer')).sendKeys(y.toString());

    await driver.findElement(By.css('[for="robotCheckbox"]')).click();
    await driver.findElement(By.css('[for="robotsRule"]')).click();
    await driver.findElement(By.css('.btn')).click();

    await driver.wait(until.alertIsPresent());
    const text = await driver.switchTo().alert().getText();
    expect(text).to.include('Congrats, you\'ve passed the task!');
    await driver.switchTo().alert().accept();
  });

});