import puppeteer from "puppeteer";
import { extractLocations, getEvents } from "../api";

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch(
            //     {
            //     headless: false,
            //     slowMo: 250,
            //     timeout: 0
            // }
        );
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });
    // beforeAll(async () => {
    //     browser = await puppeteer.launch({
    //         headless: false,
    //         slowMo: 250, // slow down by 250ms,
    //         timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    //     });
    //     page = await browser.newPage();
    //     await page.goto('http://localhost:3000/');
    //     await page.waitForSelector('.event');
    // });

    afterAll(() => {
        browser.close();
    });
    test('An event element is collapsed by default', async () => {
        // if your event's details have a different selector, use it instead of .event .details
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-btn');

        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });
    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});
describe('Filter Events by City', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch(
            {
                headless: false,
                slowMo: 250,
                timeout: 0
            }
        );
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });
    test('Displays 32 events by default', async () => {
        // if your event's details have a different selector, use it instead of .event .details
        const eventCount = await page.$$eval('.event', events => events.length);
        expect(eventCount).toBe(32);
    });
    test('User can type location name (Berlin) to see list of suggestions', async () => {
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        await page.type('.city', 'Berlin');
        const cityTextValue = await page.$eval('.city', input => input.value);
        console.log(cityTextValue);

        // filter allLocations to locations matching "Berlin"
        const suggestions = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(cityTextValue.toUpperCase()) > -1;
        }) : [];

        const suggestionCount = await page.$$eval('.suggestions li', li => li.length);
        expect(suggestions).toHaveLength(suggestionCount - 1);
    });
    test('User can select a suggestion (Berlin) to see list of events', async () => {
        const allEvents = await getEvents();
        const firstSuggestion = await page.$('.suggestions li');
        await firstSuggestion.click();
        const cityTextValue = await page.$eval('.city', input => input.value);
        const filteredEvents = allEvents ? allEvents.filter((event) => {
            return event.location.toUpperCase().indexOf(cityTextValue.toUpperCase()) > -1;
        }) : [];
        const eventCount = await page.$$eval('.event', events => events.length);
        expect(filteredEvents).toHaveLength(eventCount);
    });
});