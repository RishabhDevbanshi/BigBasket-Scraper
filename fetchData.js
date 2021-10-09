const fetchProductData = require("./fetchProductData");

module.exports = async (page, link) => {
  try {
    await page.goto(link);
    await page.waitForSelector(
      "div[qa=product] > product-template > div > .prod-view"
    );

    const res = await page.evaluate(() => {
      let links = document.querySelectorAll(
        "div[qa=product] > product-template > div > .prod-view > a"
      );
      const ret = [];
      for (let i = 0; i < links.length; i++) ret.push(links[i].href);
      return ret;
    });

    const details = [];

    let currentIndex = res.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [res[currentIndex], res[randomIndex]] = [
        res[randomIndex],
        res[currentIndex],
      ];
    }

    for (let i = 0; i < 5; i++) {
      const info = await fetchProductData(page, res[i]);
      details.push(info);
    }

    return details;
  } catch (err) {
    console.log(err);
  }
};

// module.exports = fetchData;
