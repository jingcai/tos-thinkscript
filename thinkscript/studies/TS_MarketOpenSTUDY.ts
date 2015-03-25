# TS_MarketOpen
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 18 JUL 2009

input marketOpen = 0930;
rec openPrice = if(secondsTillTime(marketOpen) == 0, open, openPrice[1]);

plot Market_Open = openPrice;
Market_Open.setpaintingStrategy(paintingStrategy.DASHES);
Market_Open.setDefaultColor(color.cyan);