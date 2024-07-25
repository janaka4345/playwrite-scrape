import retry from 'async-retry'
import { chromium, firefox, webkit } from 'playwright'

const number: number = 5

const url = 'https://quotes.toscrape.com/js/'

async function main() {
    console.log(number)
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto(url)

    // const data = await page.$eval('#some-element', (element) => {
    //     // Extract data from the element
    //     return element.textContent
    // })

    const heading = await page.innerText('//html/body/div/div[2]/span[1]', {
        timeout: 2000,
    })
    await page.click('body > div > div.row.header-box > div.col-md-4 > p > a')

    console.log(heading)
    await page.waitForTimeout(4000)
    await browser.close()
    // return data
    // console.log(page.content)
}

// await retry(main, {
//     retries: 3,
//     onRetry: (error) => {
//         console.log(error)
//     },
// })
main().catch((err) => {
    console.log(err)
})
