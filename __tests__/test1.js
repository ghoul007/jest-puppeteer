const timeout = 5000;

describe(
    '/ (Home Page)',
    () => {
        let page
        beforeAll(async() => {
            page = await global.__BROWSER__.newPage()

            // await page.goto('https://bing.com')
            await page.setViewport({ height: 1200, width: 960 })
        }, timeout)

        afterAll(async() => {
            await page.close()
        })

    },

    timeout
)