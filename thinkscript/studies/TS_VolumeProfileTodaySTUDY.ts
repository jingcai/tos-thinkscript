# TS_VolumeProfileToday
# (c) 2009 http://www.thinkscripter.com 
# All rights reserved
# thinkscripter@gmail.com
# Last Update 01 NOV 2009

declare fullrange;

def calendarDayOffset = 0;
input barColorRed = 100;
input barColorGreen = 100;
input barColorBlue = 100;
input barWeight = 1;
input barLength = 50;

def offsetDay = if getDay() == getLastDay() - calendarDayOffset then 1 else 0;
rec extbar = if getDay() != getDay()[1] then 1 else extBar[1] + 1;

def lastbar = if offsetDay and !offsetDay[-1]  or isNan(close[-1]) then 1 else 0;

def totalBins = 50;
def top = HighestAll(if offSetDay then high else double.nan);
def bottom = LowestAll(if offSetDay then low else double.nan);
def binsize = (top - bottom) / totalBins;

def binTop = Ceil((top - high) / binSize);
def binBottom = Ceil((top - low) / binSize);
def binParts = binBottom - binTop + 1;

def bin1Total = TotalSum(if binTop <= 1 and binBottom >= 1 and offSetDay then volume / binParts else 0);
def bin2Total = TotalSum(if binTop <= 2 and binBottom >= 2 and offSetDay then volume / binParts else 0);
def bin3Total = TotalSum(if binTop <= 3 and binBottom >= 3 and offSetDay then volume / binParts else 0);
def bin4Total = TotalSum(if binTop <= 4 and binBottom >= 4 and offSetDay then volume / binParts else 0);
def bin5Total = TotalSum(if binTop <= 5 and binBottom >= 5 and offSetDay then volume / binParts else 0);
def bin6Total = TotalSum(if binTop <= 6 and binBottom >= 6 and offSetDay then volume / binParts else 0);
def bin7Total = TotalSum(if binTop <= 7 and binBottom >= 7 and offSetDay then volume / binParts else 0);
def bin8Total = TotalSum(if binTop <= 8 and binBottom >= 8 and offSetDay then volume / binParts else 0);
def bin9Total = TotalSum(if binTop <= 9 and binBottom >= 9 and offSetDay then volume / binParts else 0);
def bin10Total = TotalSum(if binTop <= 10 and binBottom >= 10 and offSetDay then volume / binParts else 0);
def bin11Total = TotalSum(if binTop <= 11 and binBottom >= 11 and offSetDay then volume / binParts else 0);
def bin12Total = TotalSum(if binTop <= 12 and binBottom >= 12 and offSetDay then volume / binParts else 0);
def bin13Total = TotalSum(if binTop <= 13 and binBottom >= 13 and offSetDay then volume / binParts else 0);
def bin14Total = TotalSum(if binTop <= 14 and binBottom >= 14 and offSetDay then volume / binParts else 0);
def bin15Total = TotalSum(if binTop <= 15 and binBottom >= 15 and offSetDay then volume / binParts else 0);
def bin16Total = TotalSum(if binTop <= 16 and binBottom >= 16 and offSetDay then volume / binParts else 0);
def bin17Total = TotalSum(if binTop <= 17 and binBottom >= 17 and offSetDay then volume / binParts else 0);
def bin18Total = TotalSum(if binTop <= 18 and binBottom >= 18 and offSetDay then volume / binParts else 0);
def bin19Total = TotalSum(if binTop <= 19 and binBottom >= 19 and offSetDay then volume / binParts else 0);
def bin20Total = TotalSum(if binTop <= 20 and binBottom >= 20 and offSetDay then volume / binParts else 0);
def bin21Total = TotalSum(if binTop <= 21 and binBottom >= 21 and offSetDay then volume / binParts else 0);
def bin22Total = TotalSum(if binTop <= 22 and binBottom >= 22 and offSetDay then volume / binParts else 0);
def bin23Total = TotalSum(if binTop <= 23 and binBottom >= 23 and offSetDay then volume / binParts else 0);
def bin24Total = TotalSum(if binTop <= 24 and binBottom >= 24 and offSetDay then volume / binParts else 0);
def bin25Total = TotalSum(if binTop <= 25 and binBottom >= 25 and offSetDay then volume / binParts else 0);
def bin26Total = TotalSum(if binTop <= 26 and binBottom >= 26 and offSetDay then volume / binParts else 0);
def bin27Total = TotalSum(if binTop <= 27 and binBottom >= 27 and offSetDay then volume / binParts else 0);
def bin28Total = TotalSum(if binTop <= 28 and binBottom >= 28 and offSetDay then volume / binParts else 0);
def bin29Total = TotalSum(if binTop <= 29 and binBottom >= 29 and offSetDay then volume / binParts else 0);
def bin30Total = TotalSum(if binTop <= 30 and binBottom >= 30 and offSetDay then volume / binParts else 0);
def bin31Total = TotalSum(if binTop <= 31 and binBottom >= 31 and offSetDay then volume / binParts else 0);
def bin32Total = TotalSum(if binTop <= 32 and binBottom >= 32 and offSetDay then volume / binParts else 0);
def bin33Total = TotalSum(if binTop <= 33 and binBottom >= 33 and offSetDay then volume / binParts else 0);
def bin34Total = TotalSum(if binTop <= 34 and binBottom >= 34 and offSetDay then volume / binParts else 0);
def bin35Total = TotalSum(if binTop <= 35 and binBottom >= 35 and offSetDay then volume / binParts else 0);
def bin36Total = TotalSum(if binTop <= 36 and binBottom >= 36 and offSetDay then volume / binParts else 0);
def bin37Total = TotalSum(if binTop <= 37 and binBottom >= 37 and offSetDay then volume / binParts else 0);
def bin38Total = TotalSum(if binTop <= 38 and binBottom >= 38 and offSetDay then volume / binParts else 0);
def bin39Total = TotalSum(if binTop <= 39 and binBottom >= 39 and offSetDay then volume / binParts else 0);
def bin40Total = TotalSum(if binTop <= 40 and binBottom >= 40 and offSetDay then volume / binParts else 0);
def bin41Total = TotalSum(if binTop <= 41 and binBottom >= 41 and offSetDay then volume / binParts else 0);
def bin42Total = TotalSum(if binTop <= 42 and binBottom >= 42 and offSetDay then volume / binParts else 0);
def bin43Total = TotalSum(if binTop <= 43 and binBottom >= 43 and offSetDay then volume / binParts else 0);
def bin44Total = TotalSum(if binTop <= 44 and binBottom >= 44 and offSetDay then volume / binParts else 0);
def bin45Total = TotalSum(if binTop <= 45 and binBottom >= 45 and offSetDay then volume / binParts else 0);
def bin46Total = TotalSum(if binTop <= 46 and binBottom >= 46 and offSetDay then volume / binParts else 0);
def bin47Total = TotalSum(if binTop <= 47 and binBottom >= 47 and offSetDay then volume / binParts else 0);
def bin48Total = TotalSum(if binTop <= 48 and binBottom >= 48 and offSetDay then volume / binParts else 0);
def bin49Total = TotalSum(if binTop <= 49 and binBottom >= 49 and offSetDay then volume / binParts else 0);
def bin50Total = TotalSum(if binTop <= 50 and binBottom >= 50 and offSetDay then volume / binParts else 0);

def bm1 = Max(Max(Max(Max(bin1Total, bin2Total), bin3Total), bin4Total), bin5Total);
def bm2 = Max(Max(Max(Max(bin6Total, bin7Total), bin8Total), bin9Total), bin10Total);
def bm3 = Max(Max(Max(Max(bin11Total, bin12Total), bin13Total), bin14Total), bin15Total);
def bm4 = Max(Max(Max(Max(bin16Total, bin17Total), bin18Total), bin19Total), bin20Total);
def bm5 = Max(Max(Max(Max(bin21Total, bin22Total), bin23Total), bin24Total), bin25Total);
def bm6 = Max(Max(Max(Max(bin26Total, bin27Total), bin28Total), bin29Total), bin30Total);
def bm7 = Max(Max(Max(Max(bin31Total, bin32Total), bin33Total), bin34Total), bin35Total);
def bm8 = Max(Max(Max(Max(bin36Total, bin37Total), bin38Total), bin39Total), bin40Total);
def bm9 = Max(Max(Max(Max(bin41Total, bin42Total), bin43Total), bin44Total), bin45Total);
def bm10 = Max(Max(Max(Max(bin46Total, bin47Total), bin48Total), bin49Total), bin50Total);
def binMax = Max(Max(Max(Max(Max(Max(Max(Max(Max(bm1, bm2), bm3), bm4), bm5), bm6), bm7), bm8), bm9), bm10);

def binDepth1 = highestAll(if lastbar then Ceil((bin1Total / binMax) * barLength) else 0);
plot B1 = if bindepth1 >= extBar and extBar != 0 and offSetDay then top - binsize * 1 + binsize / 2 else double.nan;
B1.AssignValueColor(if bindepth1 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue) );
B1.SetLineWeight(barWeight);

def binDepth2 = highestAll(if lastbar then Ceil((bin2Total / binMax) * barLength) else 0);
plot B2 = if bindepth2 >= extBar and extBar != 0 and offSetDay then top - binsize * 2 + binsize / 2 else double.nan;
B2.AssignValueColor(if bindepth2 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B2.SetLineWeight(barWeight);

def binDepth3 = highestAll(if lastbar then Ceil((bin3Total / binMax) * barLength) else 0);
plot B3 = if bindepth3 >= extBar and extBar != 0 and offSetDay then top - binsize * 3 + binsize / 2 else double.nan;
B3.AssignValueColor(if bindepth3 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B3.SetLineWeight(barWeight);

def binDepth4 = highestAll(if lastbar then Ceil((bin4Total / binMax) * barLength) else 0);
plot B4 = if bindepth4 >= extBar  and extBar != 0 and offSetDay then top - binsize * 4 + binsize / 2 else double.nan;
B4.AssignValueColor(if bindepth4 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B4.SetLineWeight(barWeight);

def binDepth5 = highestAll(if lastbar then Ceil((bin5Total / binMax) * barLength) else 0);
plot B5 = if bindepth5 >= extBar  and extBar != 0 and offsetDay then top - binsize * 5 + binsize / 2 else double.nan;
B5.AssignValueColor(if bindepth5 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B5.SetLineWeight(barWeight);

def binDepth6 = highestAll(if lastbar then Ceil((bin6Total / binMax) * barLength) else 0);
plot B6 = if bindepth6 >= extBar  and extBar != 0 and offsetDay then top - binsize * 6 + binsize / 2 else double.nan;
B6.AssignValueColor(if bindepth6 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B6.SetLineWeight(barWeight);

def binDepth7 = highestAll(if lastbar then Ceil((bin7Total / binMax) * barLength) else 0);
plot B7 = if bindepth7 >= extBar  and extBar != 0 and offsetDay then top - binsize * 7 + binsize / 2 else double.nan;
B7.AssignValueColor(if bindepth7 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B7.SetLineWeight(barWeight);

def binDepth8 = highestAll(if lastbar then Ceil((bin8Total / binMax) * barLength) else 0);
plot B8 = if bindepth8 >= extBar  and extBar != 0 and offsetDay then top - binsize * 8 + binsize / 2 else double.nan;
B8.AssignValueColor(if bindepth8 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B8.SetLineWeight(barWeight);

def binDepth9 = highestAll(if lastbar then Ceil((bin9Total / binMax) * barLength) else 0);
plot B9 = if bindepth9 >= extBar  and extBar != 0 and offsetDay then top - binsize * 9 + binsize / 2 else double.nan;
B9.AssignValueColor(if bindepth9 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B9.SetLineWeight(barWeight);

def binDepth10 = highestAll(if lastbar then Ceil((bin10Total / binMax) * barLength) else 0);
plot B10 = if bindepth10 >= extBar  and extBar != 0 and offsetDay then top - binsize * 10 + binsize / 2 else double.nan;
B10.AssignValueColor(if bindepth10 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B10.SetLineWeight(barWeight);

def binDepth11 = highestAll(if lastbar then Ceil((bin11Total / binMax) * barLength) else 0);
plot B11 = if bindepth11 >= extBar  and extBar != 0 and offsetDay then top - binsize * 11 + binsize / 2 else double.nan;
B11.AssignValueColor(if bindepth11 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B11.SetLineWeight(barWeight);

def binDepth12 = highestAll(if lastbar then Ceil((bin12Total / binMax) * barLength) else 0);
plot B12 = if bindepth12 >= extBar  and extBar != 0 and offsetDay then top - binsize * 12 + binsize / 2 else double.nan;
B12.AssignValueColor(if bindepth12 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B12.SetLineWeight(barWeight);

def binDepth13 = highestAll(if lastbar then Ceil((bin13Total / binMax) * barLength) else 0);
plot B13 = if bindepth13 >= extBar  and extBar != 0 and offsetDay then top - binsize * 13 + binsize / 2 else double.nan;
B13.AssignValueColor(if bindepth13 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B13.SetLineWeight(barWeight);

def binDepth14 = highestAll(if lastbar then Ceil((bin14Total / binMax) * barLength) else 0);
plot B14 = if bindepth14 >= extBar  and extBar != 0 and offsetDay then top - binsize * 14 + binsize / 2 else double.nan;
B14.AssignValueColor(if bindepth14 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B14.SetLineWeight(barWeight);

def binDepth15 = highestAll(if lastbar then Ceil((bin15Total / binMax) * barLength) else 0);
plot B15 = if bindepth15 >= extBar  and extBar != 0 and offsetDay then top - binsize * 15 + binsize / 2 else double.nan;
B15.AssignValueColor(if bindepth15 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B15.SetLineWeight(barWeight);

def binDepth16 = highestAll(if lastbar then Ceil((bin16Total / binMax) * barLength) else 0);
plot B16 = if bindepth16 >= extBar  and extBar != 0 and offsetDay then top - binsize * 16 + binsize / 2 else double.nan;
B16.AssignValueColor(if bindepth16 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B16.SetLineWeight(barWeight);

def binDepth17 = highestAll(if lastbar then Ceil((bin17Total / binMax) * barLength) else 0);
plot B17 = if bindepth17 >= extBar  and extBar != 0 and offsetDay then top - binsize * 17 + binsize / 2 else double.nan;
B17.AssignValueColor(if bindepth17 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B17.SetLineWeight(barWeight);

rec binDepth18 = highestAll(if lastbar then Ceil((bin18Total / binMax) * barLength) else 0);
plot B18 = if bindepth18 >= extBar  and extBar != 0 and offsetDay then top - binsize * 18 + binsize / 2 else double.nan;
B18.AssignValueColor(if bindepth18 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B18.SetLineWeight(barWeight);

def binDepth19 = highestAll(if lastbar then Ceil((bin19Total / binMax) * barLength) else 0);
plot B19 = if bindepth19 >= extBar  and extBar != 0 and offsetDay then top - binsize * 19 + binsize / 2 else double.nan;
B19.AssignValueColor(if bindepth19 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B19.SetLineWeight(barWeight);

def binDepth20 = highestAll(if lastbar then Ceil((bin20Total / binMax) * barLength) else 0);
plot B20 = if bindepth20 >= extBar  and extBar != 0 and offsetDay then top - binsize * 20 + binsize / 2 else double.nan;
B20.AssignValueColor(if bindepth20 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B20.SetLineWeight(barWeight);

def binDepth21 = highestAll(if lastbar then Ceil((bin21Total / binMax) * barLength) else 0);
plot B21 = if bindepth21 >= extBar  and extBar != 0 and offsetDay then top - binsize * 21 + binsize / 2 else double.nan;
B21.AssignValueColor(if bindepth21 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B21.SetLineWeight(barWeight);

def binDepth22 = highestAll(if lastbar then Ceil((bin22Total / binMax) * barLength) else 0);
plot B22 = if bindepth22 >= extBar  and extBar != 0 and offsetDay then top - binsize * 22 + binsize / 2 else double.nan;
B22.AssignValueColor(if bindepth22 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B22.SetLineWeight(barWeight);

def binDepth23 = highestAll(if lastbar then Ceil((bin23Total / binMax) * barLength) else 0);
plot B23 = if bindepth23 >= extBar  and extBar != 0 and offsetDay then top - binsize * 23 + binsize / 2 else double.nan;
B23.AssignValueColor(if bindepth23 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B23.SetLineWeight(barWeight);

def binDepth24 = highestAll(if lastbar then Ceil((bin24Total / binMax) * barLength) else 0);
plot B24 = if bindepth24 >= extBar  and extBar != 0 and offsetDay then top - binsize * 24 + binsize / 2 else double.nan;
B24.AssignValueColor(if bindepth24 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B24.SetLineWeight(barWeight);

def binDepth25 = highestAll(if lastbar then Ceil((bin25Total / binMax) * barLength) else 0);
plot B25 = if bindepth25 >= extBar  and extBar != 0 and offsetDay then top - binsize * 25 + binsize / 2 else double.nan;
B25.AssignValueColor(if bindepth25 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B25.SetLineWeight(barWeight);

def binDepth26 = highestAll(if lastbar then Ceil((bin26Total / binMax) * barLength) else 0);
plot B26 = if bindepth26 >= extBar  and extBar != 0 and offsetDay then top - binsize * 26 + binsize / 2 else double.nan;
B26.AssignValueColor(if bindepth26 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B26.SetLineWeight(barWeight);

def binDepth27 = highestAll(if lastbar then Ceil((bin27Total / binMax) * barLength) else 0);
plot B27 = if bindepth27 >= extBar  and extBar != 0 and offsetDay then top - binsize * 27 + binsize / 2 else double.nan;
B27.AssignValueColor(if bindepth27 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B27.SetLineWeight(barWeight);

def binDepth28 = highestAll(if lastbar then Ceil((bin28Total / binMax) * barLength) else 0);
plot B28 = if bindepth28 >= extBar  and extBar != 0 and offsetDay then top - binsize * 28 + binsize / 2 else double.nan;
B28.AssignValueColor(if bindepth28 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B28.SetLineWeight(barWeight);

def binDepth29 = highestAll(if lastbar then Ceil((bin29Total / binMax) * barLength) else 0);
plot B29 = if bindepth29 >= extBar  and extBar != 0 and offsetDay then top - binsize * 29 + binsize / 2 else double.nan;
B29.AssignValueColor(if bindepth29 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B29.SetLineWeight(barWeight);

def binDepth30 = highestAll(if lastbar then Ceil((bin30Total / binMax) * barLength) else 0);
plot B30 = if bindepth30 >= extBar  and extBar != 0 and offsetDay then top - binsize * 30 + binsize / 2 else double.nan;
B30.AssignValueColor(if bindepth30 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B30.SetLineWeight(barWeight);

def binDepth31 = highestAll(if lastbar then Ceil((bin31Total / binMax) * barLength) else 0);
plot B31 = if bindepth31 >= extBar  and extBar != 0 and offsetDay then top - binsize * 31 + binsize / 2 else double.nan;
B31.AssignValueColor(if bindepth31 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B31.SetLineWeight(barWeight);

def binDepth32 = highestAll(if lastbar then Ceil((bin32Total / binMax) * barLength) else 0);
plot B32 = if bindepth32 >= extBar  and extBar != 0 and offsetDay then top - binsize * 32 + binsize / 2 else double.nan;
B32.AssignValueColor(if bindepth32 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B32.SetLineWeight(barWeight);

def binDepth33 = highestAll(if lastbar then Ceil((bin33Total / binMax) * barLength) else 0);
plot B33 = if bindepth33 >= extBar  and extBar != 0 and offsetDay then top - binsize * 33 + binsize / 2 else double.nan;
B33.AssignValueColor(if bindepth33 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B33.SetLineWeight(barWeight);

def binDepth34 = highestAll(if lastbar then Ceil((bin34Total / binMax) * barLength) else 0);
plot B34 = if bindepth34 >= extBar  and extBar != 0 and offsetDay then top - binsize * 34 + binsize / 2 else double.nan;
B34.AssignValueColor(if bindepth34 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B34.SetLineWeight(barWeight);

def binDepth35 = highestAll(if lastbar then Ceil((bin35Total / binMax) * barLength) else 0);
plot B35 = if bindepth35 >= extBar  and extBar != 0 and offsetDay then top - binsize * 35 + binsize / 2 else double.nan;
B35.AssignValueColor(if bindepth35 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B35.SetLineWeight(barWeight);

def binDepth36 = highestAll(if lastbar then Ceil((bin36Total / binMax) * barLength) else 0);
plot B36 = if bindepth36 >= extBar  and extBar != 0 and offsetDay then top - binsize * 36 + binsize / 2 else double.nan;
B36.AssignValueColor(if bindepth36 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B36.SetLineWeight(barWeight);

def binDepth37 = highestAll(if lastbar then Ceil((bin37Total / binMax) * barLength) else 0);
plot B37 = if bindepth37 >= extBar  and extBar != 0 and offsetDay then top - binsize * 37 + binsize / 2 else double.nan;
B37.AssignValueColor(if bindepth37 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B37.SetLineWeight(barWeight);

def binDepth38 = highestAll(if lastbar then Ceil((bin38Total / binMax) * barLength) else 0);
plot B38 = if bindepth38 >= extBar  and extBar != 0 and offsetDay then top - binsize * 38 + binsize / 2 else double.nan;
B38.AssignValueColor(if bindepth38 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B38.SetLineWeight(barWeight);

def binDepth39 = highestAll(if lastbar then Ceil((bin39Total / binMax) * barLength) else 0);
plot B39 = if bindepth39 >= extBar  and extBar != 0 and offsetDay then top - binsize * 39 + binsize / 2 else double.nan;
B39.AssignValueColor(if bindepth39 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B39.SetLineWeight(barWeight);

def binDepth40 = highestAll(if lastbar then Ceil((bin40Total / binMax) * barLength) else 0);
plot B40 = if bindepth40 >= extBar  and extBar != 0 and offsetDay then top - binsize * 40 + binsize / 2 else double.nan;
B40.AssignValueColor(if bindepth40 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B40.SetLineWeight(barWeight);

def binDepth41 = highestAll(if lastbar then Ceil((bin41Total / binMax) * barLength) else 0);
plot B41 = if bindepth41 >= extBar  and extBar != 0 and offsetDay then top - binsize * 41 + binsize / 2 else double.nan;
B41.AssignValueColor(if bindepth41 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B41.SetLineWeight(barWeight);

def binDepth42 = highestAll(if lastbar then Ceil((bin42Total / binMax) * barLength) else 0);
plot B42 = if bindepth42 >= extBar  and extBar != 0 and offsetDay then top - binsize * 42 + binsize / 2 else double.nan;
B42.AssignValueColor(if bindepth42 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B42.SetLineWeight(barWeight);

def binDepth43 = highestAll(if lastbar then Ceil((bin43Total / binMax) * barLength) else 0);
plot B43 = if bindepth43 >= extBar  and extBar != 0 and offsetDay then top - binsize * 43 + binsize / 2 else double.nan;
B43.AssignValueColor(if bindepth43 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B43.SetLineWeight(barWeight);

def binDepth44 = highestAll(if lastbar then Ceil((bin44Total / binMax) * barLength) else 0);
plot B44 = if bindepth44 >= extBar  and extBar != 0 and offsetDay then top - binsize * 44 + binsize / 2 else double.nan;
B44.AssignValueColor(if bindepth44 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B44.SetLineWeight(barWeight);

def binDepth45 = highestAll(if lastbar then Ceil((bin45Total / binMax) * barLength) else 0);
plot B45 = if bindepth45 >= extBar  and extBar != 0 and offsetDay then top - binsize * 45 + binsize / 2 else double.nan;
B45.AssignValueColor(if bindepth45 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B45.SetLineWeight(barWeight);

def binDepth46 = highestAll(if lastbar then Ceil((bin46Total / binMax) * barLength) else 0);
plot B46 = if bindepth46 >= extBar  and extBar != 0 and offsetDay then top - binsize * 46 + binsize / 2 else double.nan;
B46.AssignValueColor(if bindepth46 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B46.SetLineWeight(barWeight);

def binDepth47 = highestAll(if lastbar then Ceil((bin47Total / binMax) * barLength) else 0);
plot B47 = if bindepth47 >= extBar  and extBar != 0 and offsetDay then top - binsize * 47 + binsize / 2 else double.nan;
B47.AssignValueColor(if bindepth47 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B47.SetLineWeight(barWeight);

def binDepth48 = highestAll(if lastbar then Ceil((bin48Total / binMax) * barLength) else 0);
plot B48 = if bindepth48 >= extBar  and extBar != 0 and offsetDay then top - binsize * 48 + binsize / 2 else double.nan;
B48.AssignValueColor(if bindepth48 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B48.SetLineWeight(barWeight);

def binDepth49 = highestAll(if lastbar then Ceil((bin49Total / binMax) * barLength) else 0);
plot B49 = if bindepth49 >= extBar  and extBar != 0 and offsetDay then top - binsize * 49 + binsize / 2 else double.nan;
B49.AssignValueColor(if bindepth49 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B49.SetLineWeight(barWeight);

def binDepth50 = highestAll(if lastbar then Ceil((bin50Total / binMax) * barLength) else 0);
plot B50 = if bindepth50 >= extBar  and extBar != 0 and offsetDay then top - binsize * 50 + binsize / 2 else double.nan;
B50.AssignValueColor(if bindepth50 == barLength then color.yellow else CreateColor(barColorRed, barColorGreen, barColorBlue));
B50.SetLineWeight(barWeight);

B1.HideBubble();
B2.HideBubble();
B3.HideBubble();
B4.HideBubble();
B5.HideBubble();
B6.HideBubble();
B7.HideBubble();
B8.HideBubble();
B9.HideBubble();
B10.HideBubble();
B11.HideBubble();
B12.HideBubble();
B13.HideBubble();
B14.HideBubble();
B15.HideBubble();
B16.HideBubble();
B17.HideBubble();
B18.HideBubble();
B19.HideBubble();
B20.HideBubble();
B21.HideBubble();
B22.HideBubble();
B23.HideBubble();
B24.HideBubble();
B25.HideBubble();
B26.HideBubble();
B27.HideBubble();
B28.HideBubble();
B29.HideBubble();
B30.HideBubble();
B31.HideBubble();
B32.HideBubble();
B33.HideBubble();
B34.HideBubble();
B35.HideBubble();
B36.HideBubble();
B37.HideBubble();
B38.HideBubble();
B39.HideBubble();
B40.HideBubble();
B41.HideBubble();
B42.HideBubble();
B43.HideBubble();
B44.HideBubble();
B45.HideBubble();
B46.HideBubble();
B47.HideBubble();
B48.HideBubble();
B49.HideBubble();
B50.HideBubble();
