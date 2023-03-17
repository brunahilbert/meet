import puppeteer from 'puppeteer-core';

describe('show/hide an event details', () => {

  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // let browser = await puppeteer.launch({
      //   headless: false, // default is true
      //   slowMo: 250, // slow down by 250ms
      //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // });

    const eventDetails = await page.$('.Event .event-details');
    expect(eventDetails).toBeNull();

  });

  test('User can expand an event to see its details', async () => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto('http://localhost:3000/');

    // await page.waitForSelector('.Event');
    await page.click('.Event .event-button');

    const eventDetails = await page.$('.Event .event-details');
    expect(eventDetails).toBeDefined();
    // browser.close();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.Event .event-button');
    const eventDetails = await page.$('.Event .event-details');
    expect(eventDetails).toBeNull();
  });
});
