"use strict";

module.exports.handler = async (event) => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  const { url } = JSON.parse(event.body);
  let title = "";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    title = $("title").text();
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        title: title,
        url: url,
      },
      null,
      2
    ),
  };
};
