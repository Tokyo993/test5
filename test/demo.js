const { Builder, By, until } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;

describe('Selenium Store Test Suite', function() {
  this.timeout(0);  // Disable the timeout in case the tests take longer
  let driver;

  before(async function() {
    driver = new Builder().forBrowser('firefox').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('Register User', async function() {
    await driver.findElement(By.css('#header-account')).findElement(By.css('a[title=Register]')).click();
    await driver.findElement(By.css('#firstname')).sendKeys('Test');
    await driver.findElement(By.css('#middlename')).sendKeys('User');
    await driver.findElement(By.css('#lastname')).sendKeys('Lastname');
    await driver.findElement(By.css('#email_address')).sendKeys(`testuser${Date.now().toString()}@test.com`);
    await driver.findElement(By.css('#password')).sendKeys('Testpassword1!');
    await driver.findElement(By.css('#confirmation')).sendKeys('Testpassword1!');
    await driver.findElement(By.css('.buttons-set button[type=submit]')).click();
  });

  it('Login', async function() {
    await driver.get('http://demo-store.seleniumacademy.com/');
    await driver.findElement(By.css('.skip-account')).click();
    await driver.findElement(By.css('#header-account')).findElement(By.css('a[title="Log In"]')).click();
    await driver.findElement(By.css('#email')).sendKeys('testr6tusn4w@test.com');
    await driver.findElement(By.css('#pass')).sendKeys('testtest');
    await driver.findElement(By.css('#send2')).click();
    const msg = await driver.findElement(By.css('.welcome-msg')).getText();
    expect(msg).to.include('WELCOME, TEST TEST TES!');
  });

  it('Add Product To Cart', async function() {
    await driver.get('http://demo-store.seleniumacademy.com/');
    let productImage = driver.findElement(By.css('.product-image'));
    await driver.wait(until.elementIsVisible(productImage), 5000);
    await productImage.click();
    await driver.findElement(By.css('.option-white')).click();
    await driver.findElement(By.css('.option-l')).click();
    await driver.findElement(By.css('.add-to-cart-buttons button')).click();
  });

  it('Checkout Product', async function() {
    await driver.get('http://demo-store.seleniumacademy.com/');
    let productImage = driver.findElement(By.css('.product-image'));
    await driver.wait(until.elementIsVisible(productImage), 5000);
    await productImage.click();
    await driver.findElement(By.css('.option-white')).click();
    await driver.findElement(By.css('.option-l')).click();
    await driver.findElement(By.css('.add-to-cart-buttons button')).click();

    await driver.findElement(By.css('.btn-proceed-checkout')).click();

    await driver.findElement(By.css('#billing\\:firstname')).sendKeys('Test');
    await driver.findElement(By.css('#billing\\:middlename')).sendKeys('User');
    await driver.findElement(By.css('#billing\\:lastname')).sendKeys('Lastname');
    await driver.findElement(By.css('#billing\\:email')).sendKeys('teretglsiure@test.com');
    await driver.findElement(By.css('#billing\\:street1')).sendKeys('123 Main St');
    await driver.findElement(By.css('#billing\\:city')).sendKeys('New York');

    let select = await driver.findElement(By.css('#billing\\:region_id'));
    await driver.wait(until.elementLocated(By.css('#billing\\:region_id option')), 5000);
    let firstOption = await select.findElement(By.css('option'));
    await firstOption.click();

    await driver.findElement(By.css('#billing\\:postcode')).sendKeys('10001');
    await driver.findElement(By.css('#billing\\:country_id')).sendKeys('United States');
    await driver.findElement(By.css('#billing\\:telephone')).sendKeys('1234567890');
    await driver.findElement(By.css('#billing-buttons-container button')).click();
  });

});