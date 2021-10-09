module.exports = async (page, link) => {
  try {
    await page.goto(link);

    await page.waitForSelector("#carousel");

    const info = await page.evaluate(() => {
      arr = Array.from(document.querySelectorAll("._3WUR_"));
      const p0 = arr[1].innerText,
        p1 = arr[2].innerText,
        p2 = arr[3].innerText;
      const str = document.querySelector(
        "section[class=_3JQUe] > div > div:last-child > div:last-child > div > div"
      ).innerText;
      const skuID = str.split("\n")[0];
      const pageLink = window.location.href;
      const imgURL = document.querySelector(
        "#carousel > div:nth-child(1) > img"
      ).src;
      const brand = document.querySelector("a[context=brandlabel]").innerText;
      const title = document.querySelector("#title h1").innerText;
      let skuSize = "";
      let i = title.length - 1;
      for (; i >= 0; i--) {
        if (title[i] == ",") break;
        skuSize += title[i];
      }
      skuSize.trim();
      skuSize = skuSize.split("").reverse().join("");
      let skuName = title;
      const mrp = document.querySelector(
        "div[id = price] > table > tbody > tr:nth-child(1) > td:nth-child(2)"
      ).innerText;
      const sp = document.querySelector(
        "div[id = price] > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ).innerText;
      const status = document.querySelector(".Ntl90");
      const outOfStock = status === null ? "no" : "yes";

      return {
        p0: p0,
        p1: p1,
        p2: p2,
        SKUID: skuID,
        Image: imgURL,
        Brand: brand,
        SKUNAME: skuName,
        SKUSIZE: skuSize,
        MRP: mrp,
        sp: sp,
        OutOfStock: outOfStock,
        Link : pageLink
      };
    });

    return info;
  } catch (err) {
    console.log("Error in get product data : " + err.message);
  }
};
