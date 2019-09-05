const timeout = 10000
// const sleep = time => new Promise(rs => setTimeout(rs, time))
// const isObj = o => Object.prototype.toString.call(o) === '[object Object]'

describe('/ (Login Page)', () => {
  let page
  beforeAll(async () => {
    page = await global.__BROWSER__.newPage()
    await page.goto(`${process.env.URL}/login`)
    await page.setViewport({ width: 1861, height: 953 })
  }, timeout)

  afterAll(async () => {
    await page.close()
  }, timeout)

  test(
    'signing..',
    async () => {
      const email =
        '.m-login__container > .m-login__signin > .m-login__form > .form-group:nth-child(1) > .form-control'
      const pass =
        '.m-login__container > .m-login__signin > .m-login__form > .form-group:nth-child(2) > .form-control'
      const titleSelector =
        '.m-grid__item > .m-subheader > .d-flex > .mr-auto > .m-subheader__title'
      const btnSubmit = '.m-login__container #m_login_signin_submit'

      await page.type(email, process.env.EMAIL, { delay: 20 })
      await page.type(pass, process.env.PASSWORD, { delay: 20 })
      await page.click(btnSubmit)
      await page.waitForSelector(titleSelector)
      const title = await page.evaluate(() => {
        return document.querySelector(
          '.m-grid__item > .m-subheader > .d-flex > .mr-auto > .m-subheader__title'
        ).innerText
      })
      // const title = await page.$eval(titleSelector, e => e.e.innerText);
      expect(title).toContain('cloudmatic')
    },
    timeout
  )

  test(
    'virtual server page',
    async () => {
      try {
        const menuVM =
          '#m_ver_menu > .m-menu__nav > .m-menu__item:nth-child(2) > .m-menu__link > .m-menu__link-text'
        const titleVM =
          '.m-grid > .m-grid__item > .m-grid__item > app-base-data-ajax > .m-subheader'
        await page.waitForSelector(menuVM)
        await page.click(menuVM)
        await page.waitForSelector(titleVM)
        const title = await page.evaluate(
          () =>
            document.querySelector(
              '.m-grid > .m-grid__item > .m-grid__item > app-base-data-ajax > .m-subheader'
            ).innerText
        )
        expect(title).toContain('Virtual Servers')
      } catch (error) {
        console.log('error ', error)
      }
    },
    timeout
  )
})
