# TS_TPOProfileTotal
# (c) 2009 http://www.thinkscripter.com 
# All rights reserved
# thinkscripter@gmail.com
# Last Update 24 OCT 2009

declare fullrange;

input barColorRed = 119;
input barColorGreen = 136;
input barColorBlue = 153;
input barWeight = 3;

# Number of bars to right of current bar for display
# Should be a positive number
input displayOffset = 5;
# Number of bars of right space minus 5
input barLength = 45;
def totalBins = 85;
def top = HighestAll(high);
def bottom = LowestAll(low);
def binsize = (top - bottom) / totalBins;
rec extBar = if IsNaN(close[displayOffset]) then extBar[1] + 1 else 0;

def binTop = Ceil((top - high) / binSize);
def binBottom = Ceil((top - low) / binSize);

def bin1Total = TotalSum(if binTop <= 1 and binBottom >= 1 then 1.0 else 0);
def bin2Total = TotalSum(if binTop <= 2 and binBottom >= 2 then 1.0 else 0);
def bin3Total = TotalSum(if binTop <= 3 and binBottom >= 3 then 1.0 else 0);
def bin4Total = TotalSum(if binTop <= 4 and binBottom >= 4 then 1.0 else 0);
def bin5Total = TotalSum(if binTop <= 5 and binBottom >= 5 then 1.0 else 0);
def bin6Total = TotalSum(if binTop <= 6 and binBottom >= 6 then 1.0 else 0);
def bin7Total = TotalSum(if binTop <= 7 and binBottom >= 7 then 1.0 else 0);
def bin8Total = TotalSum(if binTop <= 8 and binBottom >= 8 then 1.0 else 0);
def bin9Total = TotalSum(if binTop <= 9 and binBottom >= 9 then 1.0 else 0);
def bin10Total = TotalSum(if binTop <= 10 and binBottom >= 10 then 1.0 else 0);
def bin11Total = TotalSum(if binTop <= 11 and binBottom >= 11 then 1.0 else 0);
def bin12Total = TotalSum(if binTop <= 12 and binBottom >= 12 then 1.0 else 0);
def bin13Total = TotalSum(if binTop <= 13 and binBottom >= 13 then 1.0 else 0);
def bin14Total = TotalSum(if binTop <= 14 and binBottom >= 14 then 1.0 else 0);
def bin15Total = TotalSum(if binTop <= 15 and binBottom >= 15 then 1.0 else 0);
def bin16Total = TotalSum(if binTop <= 16 and binBottom >= 16 then 1.0 else 0);
def bin17Total = TotalSum(if binTop <= 17 and binBottom >= 17 then 1.0 else 0);
def bin18Total = TotalSum(if binTop <= 18 and binBottom >= 18 then 1.0 else 0);
def bin19Total = TotalSum(if binTop <= 19 and binBottom >= 19 then 1.0 else 0);
def bin20Total = TotalSum(if binTop <= 20 and binBottom >= 20 then 1.0 else 0);
def bin21Total = TotalSum(if binTop <= 21 and binBottom >= 21 then 1.0 else 0);
def bin22Total = TotalSum(if binTop <= 22 and binBottom >= 22 then 1.0 else 0);
def bin23Total = TotalSum(if binTop <= 23 and binBottom >= 23 then 1.0 else 0);
def bin24Total = TotalSum(if binTop <= 24 and binBottom >= 24 then 1.0 else 0);
def bin25Total = TotalSum(if binTop <= 25 and binBottom >= 25 then 1.0 else 0);
def bin26Total = TotalSum(if binTop <= 26 and binBottom >= 26 then 1.0 else 0);
def bin27Total = TotalSum(if binTop <= 27 and binBottom >= 27 then 1.0 else 0);
def bin28Total = TotalSum(if binTop <= 28 and binBottom >= 28 then 1.0 else 0);
def bin29Total = TotalSum(if binTop <= 29 and binBottom >= 29 then 1.0 else 0);
def bin30Total = TotalSum(if binTop <= 30 and binBottom >= 30 then 1.0 else 0);
def bin31Total = TotalSum(if binTop <= 31 and binBottom >= 31 then 1.0 else 0);
def bin32Total = TotalSum(if binTop <= 32 and binBottom >= 32 then 1.0 else 0);
def bin33Total = TotalSum(if binTop <= 33 and binBottom >= 33 then 1.0 else 0);
def bin34Total = TotalSum(if binTop <= 34 and binBottom >= 34 then 1.0 else 0);
def bin35Total = TotalSum(if binTop <= 35 and binBottom >= 35 then 1.0 else 0);
def bin36Total = TotalSum(if binTop <= 36 and binBottom >= 36 then 1.0 else 0);
def bin37Total = TotalSum(if binTop <= 37 and binBottom >= 37 then 1.0 else 0);
def bin38Total = TotalSum(if binTop <= 38 and binBottom >= 38 then 1.0 else 0);
def bin39Total = TotalSum(if binTop <= 39 and binBottom >= 39 then 1.0 else 0);
def bin40Total = TotalSum(if binTop <= 40 and binBottom >= 40 then 1.0 else 0);
def bin41Total = TotalSum(if binTop <= 41 and binBottom >= 41 then 1.0 else 0);
def bin42Total = TotalSum(if binTop <= 42 and binBottom >= 42 then 1.0 else 0);
def bin43Total = TotalSum(if binTop <= 43 and binBottom >= 43 then 1.0 else 0);
def bin44Total = TotalSum(if binTop <= 44 and binBottom >= 44 then 1.0 else 0);
def bin45Total = TotalSum(if binTop <= 45 and binBottom >= 45 then 1.0 else 0);
def bin46Total = TotalSum(if binTop <= 46 and binBottom >= 46 then 1.0 else 0);
def bin47Total = TotalSum(if binTop <= 47 and binBottom >= 47 then 1.0 else 0);
def bin48Total = TotalSum(if binTop <= 48 and binBottom >= 48 then 1.0 else 0);
def bin49Total = TotalSum(if binTop <= 49 and binBottom >= 49 then 1.0 else 0);
def bin50Total = TotalSum(if binTop <= 50 and binBottom >= 50 then 1.0 else 0);

def bin1Totala = TotalSum(if binTop <= 51 and binBottom >= 51 then 1.0 else 0);
def bin2Totala = TotalSum(if binTop <= 52 and binBottom >= 52 then 1.0 else 0);
def bin3Totala = TotalSum(if binTop <= 53 and binBottom >= 53 then 1.0 else 0);
def bin4Totala = TotalSum(if binTop <= 54 and binBottom >= 54 then 1.0 else 0);
def bin5Totala = TotalSum(if binTop <= 55 and binBottom >= 55 then 1.0 else 0);
def bin6Totala = TotalSum(if binTop <= 56 and binBottom >= 56 then 1.0 else 0);
def bin7Totala = TotalSum(if binTop <= 57 and binBottom >= 57 then 1.0 else 0);
def bin8Totala = TotalSum(if binTop <= 58 and binBottom >= 58 then 1.0 else 0);
def bin9Totala = TotalSum(if binTop <= 59 and binBottom >= 59 then 1.0 else 0);
def bin10Totala = TotalSum(if binTop <= 60 and binBottom >= 60 then 1.0 else 0);
def bin11Totala = TotalSum(if binTop <= 61 and binBottom >= 61 then 1.0 else 0);
def bin12Totala = TotalSum(if binTop <= 62 and binBottom >= 62 then 1.0 else 0);
def bin13Totala = TotalSum(if binTop <= 63 and binBottom >= 63 then 1.0 else 0);
def bin14Totala = TotalSum(if binTop <= 64 and binBottom >= 64 then 1.0 else 0);
def bin15Totala = TotalSum(if binTop <= 65 and binBottom >= 65 then 1.0 else 0);
def bin16Totala = TotalSum(if binTop <= 66 and binBottom >= 66 then 1.0 else 0);
def bin17Totala = TotalSum(if binTop <= 67 and binBottom >= 67 then 1.0 else 0);
def bin18Totala = TotalSum(if binTop <= 68 and binBottom >= 68 then 1.0 else 0);
def bin19Totala = TotalSum(if binTop <= 69 and binBottom >= 69 then 1.0 else 0);
def bin20Totala = TotalSum(if binTop <= 70 and binBottom >= 70 then 1.0 else 0);
def bin21Totala = TotalSum(if binTop <= 71 and binBottom >= 71 then 1.0 else 0);
def bin22Totala = TotalSum(if binTop <= 72 and binBottom >= 72 then 1.0 else 0);
def bin23Totala = TotalSum(if binTop <= 73 and binBottom >= 73 then 1.0 else 0);
def bin24Totala = TotalSum(if binTop <= 74 and binBottom >= 74 then 1.0 else 0);
def bin25Totala = TotalSum(if binTop <= 75 and binBottom >= 75 then 1.0 else 0);
def bin26Totala = TotalSum(if binTop <= 76 and binBottom >= 76 then 1.0 else 0);
def bin27Totala = TotalSum(if binTop <= 77 and binBottom >= 77 then 1.0 else 0);
def bin28Totala = TotalSum(if binTop <= 78 and binBottom >= 78 then 1.0 else 0);
def bin29Totala = TotalSum(if binTop <= 79 and binBottom >= 79 then 1.0 else 0);
def bin30Totala = TotalSum(if binTop <= 80 and binBottom >= 80 then 1.0 else 0);
def bin31Totala = TotalSum(if binTop <= 81 and binBottom >= 81 then 1.0 else 0);
def bin32Totala = TotalSum(if binTop <= 82 and binBottom >= 82 then 1.0 else 0);
def bin33Totala = TotalSum(if binTop <= 83 and binBottom >= 83 then 1.0 else 0);
def bin34Totala = TotalSum(if binTop <= 84 and binBottom >= 84 then 1.0 else 0);
def bin35Totala = TotalSum(if binTop <= 85 and binBottom >= 85 then 1.0 else 0);

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
def binMaxA = Max(Max(Max(Max(Max(Max(Max(Max(Max(bm1, bm2), bm3), bm4), bm5), bm6), bm7), bm8), bm9), bm10);

def bm1a = Max(Max(Max(Max(bin1Totala, bin2Totala), bin3Totala), bin4Totala), bin5Totala);
def bm2a = Max(Max(Max(Max(bin6Totala, bin7Totala), bin8Totala), bin9Totala), bin10Totala);
def bm3a = Max(Max(Max(Max(bin11Totala, bin12Totala), bin13Totala), bin14Totala), bin15Totala);
def bm4a = Max(Max(Max(Max(bin16Totala, bin17Totala), bin18Totala), bin19Totala), bin20Totala);
def bm5a = Max(Max(Max(Max(bin21Totala, bin22Totala), bin23Totala), bin24Totala), bin25Totala);
def bm6a = Max(Max(Max(Max(bin26Totala, bin27Totala), bin28Totala), bin29Totala), bin30Totala);
def bm7a = Max(Max(Max(Max(bin31Totala, bin32Totala), bin33Totala), bin34Totala), bin35Totala);
def binMaxB = Max(Max(Max(Max(Max(Max(bm1a, bm2a), bm3a), bm4a), bm5a), bm6a), bm7a);

def binMax = Max(binMaxA, binMaxB);

rec binDepth1 = if IsNaN(close) then binDepth1[1] else Ceil((bin1Total / binMax) * barLength);
plot B1 = if bindepth1 >= extBar and extBar != 0 then top - binsize * 1 + binsize / 2 else double.nan;
B1.AssignValueColor(if bindepth1 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue) );
B1.setLineWeight(barWeight);

rec binDepth2 = if IsNaN(close) then binDepth2[1] else Ceil((bin2Total / binMax) * barLength);
plot B2 = if bindepth2 >= extBar and extBar != 0 then top - binsize * 2 + binsize / 2 else double.nan;
B2.AssignValueColor(if bindepth2 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B2.setLineWeight(barWeight);

rec binDepth3 = if IsNaN(close) then binDepth3[1] else Ceil((bin3Total / binMax) * barLength);
plot B3 = if bindepth3 >= extBar and extBar != 0 then top - binsize * 3 + binsize / 2 else double.nan;
B3.AssignValueColor(if bindepth3 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B3.setLineWeight(barWeight);

rec binDepth4 = if IsNaN(close) then binDepth4[1] else Ceil((bin4Total / binMax) * barLength);
plot B4 = if bindepth4 >= extBar  and extBar != 0 then top - binsize * 4 + binsize / 2 else double.nan;
B4.AssignValueColor(if bindepth4 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B4.setLineWeight(barWeight);

rec binDepth5 = if IsNaN(close) then binDepth5[1] else Ceil((bin5Total / binMax) * barLength);
plot B5 = if bindepth5 >= extBar  and extBar != 0 then top - binsize * 5 + binsize / 2 else double.nan;
B5.AssignValueColor(if bindepth5 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B5.setLineWeight(barWeight);

rec binDepth6 = if IsNaN(close) then binDepth6[1] else Ceil((bin6Total / binMax) * barLength);
plot B6 = if bindepth6 >= extBar  and extBar != 0 then top - binsize * 6 + binsize / 2 else double.nan;
B6.AssignValueColor(if bindepth6 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B6.setLineWeight(barWeight);

rec binDepth7 = if IsNaN(close) then binDepth7[1] else Ceil((bin7Total / binMax) * barLength);
plot B7 = if bindepth7 >= extBar  and extBar != 0 then top - binsize * 7 + binsize / 2 else double.nan;
B7.AssignValueColor(if bindepth7 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B7.setLineWeight(barWeight);

rec binDepth8 = if IsNaN(close) then binDepth8[1] else Ceil((bin8Total / binMax) * barLength);
plot B8 = if bindepth8 >= extBar  and extBar != 0 then top - binsize * 8 + binsize / 2 else double.nan;
B8.AssignValueColor(if bindepth8 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B8.setLineWeight(barWeight);

rec binDepth9 = if IsNaN(close) then binDepth9[1] else Ceil((bin9Total / binMax) * barLength);
plot B9 = if bindepth9 >= extBar  and extBar != 0 then top - binsize * 9 + binsize / 2 else double.nan;
B9.AssignValueColor(if bindepth9 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B9.setLineWeight(barWeight);

rec binDepth10 = if IsNaN(close) then binDepth10[1] else Ceil((bin10Total / binMax) * barLength);
plot B10 = if bindepth10 >= extBar  and extBar != 0 then top - binsize * 10 + binsize / 2 else double.nan;
B10.AssignValueColor(if bindepth10 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B10.setLineWeight(barWeight);

rec binDepth11 = if IsNaN(close) then binDepth11[1] else Ceil((bin11Total / binMax) * barLength);
plot B11 = if bindepth11 >= extBar  and extBar != 0 then top - binsize * 11 + binsize / 2 else double.nan;
B11.AssignValueColor(if bindepth11 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B11.setLineWeight(barWeight);

rec binDepth12 = if IsNaN(close) then binDepth12[1] else Ceil((bin12Total / binMax) * barLength);
plot B12 = if bindepth12 >= extBar  and extBar != 0 then top - binsize * 12 + binsize / 2 else double.nan;
B12.AssignValueColor(if bindepth12 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B12.setLineWeight(barWeight);

rec binDepth13 = if IsNaN(close) then binDepth13[1] else Ceil((bin13Total / binMax) * barLength);
plot B13 = if bindepth13 >= extBar  and extBar != 0 then top - binsize * 13 + binsize / 2 else double.nan;
B13.AssignValueColor(if bindepth13 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B13.setLineWeight(barWeight);

rec binDepth14 = if IsNaN(close) then binDepth14[1] else Ceil((bin14Total / binMax) * barLength);
plot B14 = if bindepth14 >= extBar  and extBar != 0 then top - binsize * 14 + binsize / 2 else double.nan;
B14.AssignValueColor(if bindepth14 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B14.setLineWeight(barWeight);

rec binDepth15 = if IsNaN(close) then binDepth15[1] else Ceil((bin15Total / binMax) * barLength);
plot B15 = if bindepth15 >= extBar  and extBar != 0 then top - binsize * 15 + binsize / 2 else double.nan;
B15.AssignValueColor(if bindepth15 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B15.setLineWeight(barWeight);

rec binDepth16 = if IsNaN(close) then binDepth16[1] else Ceil((bin16Total / binMax) * barLength);
plot B16 = if bindepth16 >= extBar  and extBar != 0 then top - binsize * 16 + binsize / 2 else double.nan;
B16.AssignValueColor(if bindepth16 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B16.setLineWeight(barWeight);

rec binDepth17 = if IsNaN(close) then binDepth17[1] else Ceil((bin17Total / binMax) * barLength);
plot B17 = if bindepth17 >= extBar  and extBar != 0 then top - binsize * 17 + binsize / 2 else double.nan;
B17.AssignValueColor(if bindepth17 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B17.setLineWeight(barWeight);

rec binDepth18 = if IsNaN(close) then binDepth18[1] else Ceil((bin18Total / binMax) * barLength);
plot B18 = if bindepth18 >= extBar  and extBar != 0 then top - binsize * 18 + binsize / 2 else double.nan;
B18.AssignValueColor(if bindepth18 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B18.setLineWeight(barWeight);

rec binDepth19 = if IsNaN(close) then binDepth19[1] else Ceil((bin19Total / binMax) * barLength);
plot B19 = if bindepth19 >= extBar  and extBar != 0 then top - binsize * 19 + binsize / 2 else double.nan;
B19.AssignValueColor(if bindepth19 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B19.setLineWeight(barWeight);

rec binDepth20 = if IsNaN(close) then binDepth20[1] else Ceil((bin20Total / binMax) * barLength);
plot B20 = if bindepth20 >= extBar  and extBar != 0 then top - binsize * 20 + binsize / 2 else double.nan;
B20.AssignValueColor(if bindepth20 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B20.setLineWeight(barWeight);

rec binDepth21 = if IsNaN(close) then binDepth21[1] else Ceil((bin21Total / binMax) * barLength);
plot B21 = if bindepth21 >= extBar  and extBar != 0 then top - binsize * 21 + binsize / 2 else double.nan;
B21.AssignValueColor(if bindepth21 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B21.setLineWeight(barWeight);

rec binDepth22 = if IsNaN(close) then binDepth22[1] else Ceil((bin22Total / binMax) * barLength);
plot B22 = if bindepth22 >= extBar  and extBar != 0 then top - binsize * 22 + binsize / 2 else double.nan;
B22.AssignValueColor(if bindepth22 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B22.setLineWeight(barWeight);

rec binDepth23 = if IsNaN(close) then binDepth23[1] else Ceil((bin23Total / binMax) * barLength);
plot B23 = if bindepth23 >= extBar  and extBar != 0 then top - binsize * 23 + binsize / 2 else double.nan;
B23.AssignValueColor(if bindepth23 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B23.setLineWeight(barWeight);

rec binDepth24 = if IsNaN(close) then binDepth24[1] else Ceil((bin24Total / binMax) * barLength);
plot B24 = if bindepth24 >= extBar  and extBar != 0 then top - binsize * 24 + binsize / 2 else double.nan;
B24.AssignValueColor(if bindepth24 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B24.setLineWeight(barWeight);

rec binDepth25 = if IsNaN(close) then binDepth25[1] else Ceil((bin25Total / binMax) * barLength);
plot B25 = if bindepth25 >= extBar  and extBar != 0 then top - binsize * 25 + binsize / 2 else double.nan;
B25.AssignValueColor(if bindepth25 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B25.setLineWeight(barWeight);

rec binDepth26 = if IsNaN(close) then binDepth26[1] else Ceil((bin26Total / binMax) * barLength);
plot B26 = if bindepth26 >= extBar  and extBar != 0 then top - binsize * 26 + binsize / 2 else double.nan;
B26.AssignValueColor(if bindepth26 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B26.setLineWeight(barWeight);

rec binDepth27 = if IsNaN(close) then binDepth27[1] else Ceil((bin27Total / binMax) * barLength);
plot B27 = if bindepth27 >= extBar  and extBar != 0 then top - binsize * 27 + binsize / 2 else double.nan;
B27.AssignValueColor(if bindepth27 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B27.setLineWeight(barWeight);

rec binDepth28 = if IsNaN(close) then binDepth28[1] else Ceil((bin28Total / binMax) * barLength);
plot B28 = if bindepth28 >= extBar  and extBar != 0 then top - binsize * 28 + binsize / 2 else double.nan;
B28.AssignValueColor(if bindepth28 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B28.setLineWeight(barWeight);

rec binDepth29 = if IsNaN(close) then binDepth29[1] else Ceil((bin29Total / binMax) * barLength);
plot B29 = if bindepth29 >= extBar  and extBar != 0 then top - binsize * 29 + binsize / 2 else double.nan;
B29.AssignValueColor(if bindepth29 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B29.setLineWeight(barWeight);

rec binDepth30 = if IsNaN(close) then binDepth30[1] else Ceil((bin30Total / binMax) * barLength);
plot B30 = if bindepth30 >= extBar  and extBar != 0 then top - binsize * 30 + binsize / 2 else double.nan;
B30.AssignValueColor(if bindepth30 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B30.setLineWeight(barWeight);

rec binDepth31 = if IsNaN(close) then binDepth31[1] else Ceil((bin31Total / binMax) * barLength);
plot B31 = if bindepth31 >= extBar  and extBar != 0 then top - binsize * 31 + binsize / 2 else double.nan;
B31.AssignValueColor(if bindepth31 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B31.setLineWeight(barWeight);

rec binDepth32 = if IsNaN(close) then binDepth32[1] else Ceil((bin32Total / binMax) * barLength);
plot B32 = if bindepth32 >= extBar  and extBar != 0 then top - binsize * 32 + binsize / 2 else double.nan;
B32.AssignValueColor(if bindepth32 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B32.setLineWeight(barWeight);

rec binDepth33 = if IsNaN(close) then binDepth33[1] else Ceil((bin33Total / binMax) * barLength);
plot B33 = if bindepth33 >= extBar  and extBar != 0 then top - binsize * 33 + binsize / 2 else double.nan;
B33.AssignValueColor(if bindepth33 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B33.setLineWeight(barWeight);

rec binDepth34 = if IsNaN(close) then binDepth34[1] else Ceil((bin34Total / binMax) * barLength);
plot B34 = if bindepth34 >= extBar  and extBar != 0 then top - binsize * 34 + binsize / 2 else double.nan;
B34.AssignValueColor(if bindepth34 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B34.setLineWeight(barWeight);

rec binDepth35 = if IsNaN(close) then binDepth35[1] else Ceil((bin35Total / binMax) * barLength);
plot B35 = if bindepth35 >= extBar  and extBar != 0 then top - binsize * 35 + binsize / 2 else double.nan;
B35.AssignValueColor(if bindepth35 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B35.setLineWeight(barWeight);

rec binDepth36 = if IsNaN(close) then binDepth36[1] else Ceil((bin36Total / binMax) * barLength);
plot B36 = if bindepth36 >= extBar  and extBar != 0 then top - binsize * 36 + binsize / 2 else double.nan;
B36.AssignValueColor(if bindepth36 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B36.setLineWeight(barWeight);

rec binDepth37 = if IsNaN(close) then binDepth37[1] else Ceil((bin37Total / binMax) * barLength);
plot B37 = if bindepth37 >= extBar  and extBar != 0 then top - binsize * 37 + binsize / 2 else double.nan;
B37.AssignValueColor(if bindepth37 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B37.setLineWeight(barWeight);

rec binDepth38 = if IsNaN(close) then binDepth38[1] else Ceil((bin38Total / binMax) * barLength);
plot B38 = if bindepth38 >= extBar  and extBar != 0 then top - binsize * 38 + binsize / 2 else double.nan;
B38.AssignValueColor(if bindepth38 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B38.setLineWeight(barWeight);

rec binDepth39 = if IsNaN(close) then binDepth39[1] else Ceil((bin39Total / binMax) * barLength);
plot B39 = if bindepth39 >= extBar  and extBar != 0 then top - binsize * 39 + binsize / 2 else double.nan;
B39.AssignValueColor(if bindepth39 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B39.setLineWeight(barWeight);

rec binDepth40 = if IsNaN(close) then binDepth40[1] else Ceil((bin40Total / binMax) * barLength);
plot B40 = if bindepth40 >= extBar  and extBar != 0 then top - binsize * 40 + binsize / 2 else double.nan;
B40.AssignValueColor(if bindepth40 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B40.setLineWeight(barWeight);

rec binDepth41 = if IsNaN(close) then binDepth41[1] else Ceil((bin41Total / binMax) * barLength);
plot B41 = if bindepth41 >= extBar  and extBar != 0 then top - binsize * 41 + binsize / 2 else double.nan;
B41.AssignValueColor(if bindepth41 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B41.setLineWeight(barWeight);

rec binDepth42 = if IsNaN(close) then binDepth42[1] else Ceil((bin42Total / binMax) * barLength);
plot B42 = if bindepth42 >= extBar  and extBar != 0 then top - binsize * 42 + binsize / 2 else double.nan;
B42.AssignValueColor(if bindepth42 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B42.setLineWeight(barWeight);

rec binDepth43 = if IsNaN(close) then binDepth43[1] else Ceil((bin43Total / binMax) * barLength);
plot B43 = if bindepth43 >= extBar  and extBar != 0 then top - binsize * 43 + binsize / 2 else double.nan;
B43.AssignValueColor(if bindepth43 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B43.setLineWeight(barWeight);

rec binDepth44 = if IsNaN(close) then binDepth44[1] else Ceil((bin44Total / binMax) * barLength);
plot B44 = if bindepth44 >= extBar  and extBar != 0 then top - binsize * 44 + binsize / 2 else double.nan;
B44.AssignValueColor(if bindepth44 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B44.setLineWeight(barWeight);

rec binDepth45 = if IsNaN(close) then binDepth45[1] else Ceil((bin45Total / binMax) * barLength);
plot B45 = if bindepth45 >= extBar  and extBar != 0 then top - binsize * 45 + binsize / 2 else double.nan;
B45.AssignValueColor(if bindepth45 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B45.setLineWeight(barWeight);

rec binDepth46 = if IsNaN(close) then binDepth46[1] else Ceil((bin46Total / binMax) * barLength);
plot B46 = if bindepth46 >= extBar  and extBar != 0 then top - binsize * 46 + binsize / 2 else double.nan;
B46.AssignValueColor(if bindepth46 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B46.setLineWeight(barWeight);

rec binDepth47 = if IsNaN(close) then binDepth47[1] else Ceil((bin47Total / binMax) * barLength);
plot B47 = if bindepth47 >= extBar  and extBar != 0 then top - binsize * 47 + binsize / 2 else double.nan;
B47.AssignValueColor(if bindepth47 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B47.setLineWeight(barWeight);

rec binDepth48 = if IsNaN(close) then binDepth48[1] else Ceil((bin48Total / binMax) * barLength);
plot B48 = if bindepth48 >= extBar  and extBar != 0 then top - binsize * 48 + binsize / 2 else double.nan;
B48.AssignValueColor(if bindepth48 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B48.setLineWeight(barWeight);

rec binDepth49 = if IsNaN(close) then binDepth49[1] else Ceil((bin49Total / binMax) * barLength);
plot B49 = if bindepth49 >= extBar  and extBar != 0 then top - binsize * 49 + binsize / 2 else double.nan;
B49.AssignValueColor(if bindepth49 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B49.setLineWeight(barWeight);

rec binDepth50 = if IsNaN(close) then binDepth50[1] else Ceil((bin50Total / binMax) * barLength);
plot B50 = if bindepth50 >= extBar  and extBar != 0 then top - binsize * 50 + binsize / 2 else double.nan;
B50.AssignValueColor(if bindepth50 == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B50.setLineWeight(barWeight);

rec binDepth1a = if IsNaN(close) then binDepth1a[1] else Ceil((bin1Totala / binMax) * barLength);
plot B1a = if bindepth1a >= extBar and extBar != 0 then top - binsize * 51 + binsize / 2 else double.nan;
B1a.AssignValueColor(if bindepth1a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B1a.setLineWeight(barWeight);

rec binDepth2a = if IsNaN(close) then binDepth2a[1] else Ceil((bin2Totala / binMax) * barLength);
plot B2a = if bindepth2a >= extBar and extBar != 0 then top - binsize * 52 + binsize / 2 else double.nan;
B2a.AssignValueColor(if bindepth2a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B2a.setLineWeight(barWeight);

rec binDepth3a = if IsNaN(close) then binDepth3a[1] else Ceil((bin3Totala / binMax) * barLength);
plot B3a = if bindepth3a >= extBar and extBar != 0 then top - binsize * 53 + binsize / 2 else double.nan;
B3a.AssignValueColor(if bindepth3a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B3a.setLineWeight(barWeight);

rec binDepth4a = if IsNaN(close) then binDepth4a[1] else Ceil((bin4Totala / binMax) * barLength);
plot B4a = if bindepth4a >= extBar  and extBar != 0 then top - binsize * 54 + binsize / 2 else double.nan;
B4a.AssignValueColor(if bindepth4a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B4a.setLineWeight(barWeight);

rec binDepth5a = if IsNaN(close) then binDepth5a[1] else Ceil((bin5Totala / binMax) * barLength);
plot B5a = if bindepth5a >= extBar  and extBar != 0 then top - binsize * 55 + binsize / 2 else double.nan;
B5a.AssignValueColor(if bindepth5a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B5a.setLineWeight(barWeight);

rec binDepth6a = if IsNaN(close) then binDepth6a[1] else Ceil((bin6Totala / binMax) * barLength);
plot B6a = if bindepth6a >= extBar  and extBar != 0 then top - binsize * 56 + binsize / 2 else double.nan;
B6a.AssignValueColor(if bindepth6a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B6a.setLineWeight(barWeight);

rec binDepth7a = if IsNaN(close) then binDepth7a[1] else Ceil((bin7Totala / binMax) * barLength);
plot B7a = if bindepth7a >= extBar  and extBar != 0 then top - binsize * 57 + binsize / 2 else double.nan;
B7a.AssignValueColor(if bindepth7a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B7a.setLineWeight(barWeight);

rec binDepth8a = if IsNaN(close) then binDepth8a[1] else Ceil((bin8Totala / binMax) * barLength);
plot B8a = if bindepth8a >= extBar  and extBar != 0 then top - binsize * 58 + binsize / 2 else double.nan;
B8a.AssignValueColor(if bindepth8a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B8a.setLineWeight(barWeight);

rec binDepth9a = if IsNaN(close) then binDepth9a[1] else Ceil((bin9Totala / binMax) * barLength);
plot B9a = if bindepth9a >= extBar  and extBar != 0 then top - binsize * 59 + binsize / 2 else double.nan;
B9a.AssignValueColor(if bindepth9a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B9a.setLineWeight(barWeight);

rec binDepth10a = if IsNaN(close) then binDepth10a[1] else Ceil((bin10Totala / binMax) * barLength);
plot B10a = if bindepth10a >= extBar  and extBar != 0 then top - binsize * 60 + binsize / 2 else double.nan;
B10a.AssignValueColor(if bindepth10a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B10a.setLineWeight(barWeight);

rec binDepth11a = if IsNaN(close) then binDepth11a[1] else Ceil((bin11Totala / binMax) * barLength);
plot B11a = if bindepth11a >= extBar  and extBar != 0 then top - binsize * 61 + binsize / 2 else double.nan;
B11a.AssignValueColor(if bindepth11a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B11a.setLineWeight(barWeight);

rec binDepth12a = if IsNaN(close) then binDepth12a[1] else Ceil((bin12Totala / binMax) * barLength);
plot B12a = if bindepth12a >= extBar  and extBar != 0 then top - binsize * 62 + binsize / 2 else double.nan;
B12a.AssignValueColor(if bindepth12a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B12a.setLineWeight(barWeight);

rec binDepth13a = if IsNaN(close) then binDepth13a[1] else Ceil((bin13Totala / binMax) * barLength);
plot B13a = if bindepth13a >= extBar  and extBar != 0 then top - binsize * 63 + binsize / 2 else double.nan;
B13a.AssignValueColor(if bindepth13a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B13a.setLineWeight(barWeight);

rec binDepth14a = if IsNaN(close) then binDepth14a[1] else Ceil((bin14Totala / binMax) * barLength);
plot B14a = if bindepth14a >= extBar  and extBar != 0 then top - binsize * 64 + binsize / 2 else double.nan;
B14a.AssignValueColor(if bindepth14a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B14a.setLineWeight(barWeight);

rec binDepth15a = if IsNaN(close) then binDepth15a[1] else Ceil((bin15Totala / binMax) * barLength);
plot B15a = if bindepth15a >= extBar  and extBar != 0 then top - binsize * 65 + binsize / 2 else double.nan;
B15a.AssignValueColor(if bindepth15a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B15a.setLineWeight(barWeight);

rec binDepth16a = if IsNaN(close) then binDepth16a[1] else Ceil((bin16Totala / binMax) * barLength);
plot B16a = if bindepth16a >= extBar  and extBar != 0 then top - binsize * 66 + binsize / 2 else double.nan;
B16a.AssignValueColor(if bindepth16a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B16a.setLineWeight(barWeight);

rec binDepth17a = if IsNaN(close) then binDepth17a[1] else Ceil((bin17Totala / binMax) * barLength);
plot B17a = if bindepth17a >= extBar  and extBar != 0 then top - binsize * 67 + binsize / 2 else double.nan;
B17a.AssignValueColor(if bindepth17a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B17a.setLineWeight(barWeight);

rec binDepth18a = if IsNaN(close) then binDepth18a[1] else Ceil((bin18Totala / binMax) * barLength);
plot B18a = if bindepth18a >= extBar  and extBar != 0 then top - binsize * 68 + binsize / 2 else double.nan;
B18a.AssignValueColor(if bindepth18a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B18a.setLineWeight(barWeight);

rec binDepth19a = if IsNaN(close) then binDepth19a[1] else Ceil((bin19Totala / binMax) * barLength);
plot B19a = if bindepth19a >= extBar  and extBar != 0 then top - binsize * 69 + binsize / 2 else double.nan;
B19a.AssignValueColor(if bindepth19a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B19a.setLineWeight(barWeight);

rec binDepth20a = if IsNaN(close) then binDepth20a[1] else Ceil((bin20Totala / binMax) * barLength);
plot B20a = if bindepth20a >= extBar  and extBar != 0 then top - binsize * 70 + binsize / 2 else double.nan;
B20a.AssignValueColor(if bindepth20a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B20a.setLineWeight(barWeight);

rec binDepth21a = if IsNaN(close) then binDepth21a[1] else Ceil((bin21Totala / binMax) * barLength);
plot B21a = if bindepth21a >= extBar  and extBar != 0 then top - binsize * 71 + binsize / 2 else double.nan;
B21a.AssignValueColor(if bindepth21a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B21a.setLineWeight(barWeight);

rec binDepth22a = if IsNaN(close) then binDepth22a[1] else Ceil((bin22Totala / binMax) * barLength);
plot B22a = if bindepth22a >= extBar  and extBar != 0 then top - binsize * 72 + binsize / 2 else double.nan;
B22a.AssignValueColor(if bindepth22a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B22a.setLineWeight(barWeight);

rec binDepth23a = if IsNaN(close) then binDepth23a[1] else Ceil((bin23Totala / binMax) * barLength);
plot B23a = if bindepth23a >= extBar  and extBar != 0 then top - binsize * 73 + binsize / 2 else double.nan;
B23a.AssignValueColor(if bindepth23a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B23a.setLineWeight(barWeight);

rec binDepth24a = if IsNaN(close) then binDepth24a[1] else Ceil((bin24Totala / binMax) * barLength);
plot B24a = if bindepth24a >= extBar  and extBar != 0 then top - binsize * 74 + binsize / 2 else double.nan;
B24a.AssignValueColor(if bindepth24a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B24a.setLineWeight(barWeight);

rec binDepth25a = if IsNaN(close) then binDepth25a[1] else Ceil((bin25Totala / binMax) * barLength);
plot B25a = if bindepth25a >= extBar  and extBar != 0 then top - binsize * 75 + binsize / 2 else double.nan;
B25a.AssignValueColor(if bindepth25a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B25a.setLineWeight(barWeight);

rec binDepth26a = if IsNaN(close) then binDepth26a[1] else Ceil((bin26Totala / binMax) * barLength);
plot B26a = if bindepth26a >= extBar  and extBar != 0 then top - binsize * 76 + binsize / 2 else double.nan;
B26a.AssignValueColor(if bindepth26a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B26a.setLineWeight(barWeight);

rec binDepth27a = if IsNaN(close) then binDepth27a[1] else Ceil((bin27Totala / binMax) * barLength);
plot B27a = if bindepth27a >= extBar  and extBar != 0 then top - binsize * 77 + binsize / 2 else double.nan;
B27a.AssignValueColor(if bindepth27a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B27a.setLineWeight(barWeight);

rec binDepth28a = if IsNaN(close) then binDepth28a[1] else Ceil((bin28Totala / binMax) * barLength);
plot B28a = if bindepth28a >= extBar  and extBar != 0 then top - binsize * 78 + binsize / 2 else double.nan;
B28a.AssignValueColor(if bindepth28a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B28a.setLineWeight(barWeight);

rec binDepth29a = if IsNaN(close) then binDepth29a[1] else Ceil((bin29Totala / binMax) * barLength);
plot B29a = if bindepth29a >= extBar  and extBar != 0 then top - binsize * 79 + binsize / 2 else double.nan;
B29a.AssignValueColor(if bindepth29a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B29a.setLineWeight(barWeight);

rec binDepth30a = if IsNaN(close) then binDepth30a[1] else Ceil((bin30Totala / binMax) * barLength);
plot B30a = if bindepth30a >= extBar  and extBar != 0 then top - binsize * 80 + binsize / 2 else double.nan;
B30a.AssignValueColor(if bindepth30a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B30a.setLineWeight(barWeight);

rec binDepth31a = if IsNaN(close) then binDepth31a[1] else Ceil((bin31Totala / binMax) * barLength);
plot B31a = if bindepth31a >= extBar  and extBar != 0 then top - binsize * 81 + binsize / 2 else double.nan;
B31a.AssignValueColor(if bindepth31a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B31a.setLineWeight(barWeight);

rec binDepth32a = if IsNaN(close) then binDepth32a[1] else Ceil((bin32Totala / binMax) * barLength);
plot B32a = if bindepth32a >= extBar  and extBar != 0 then top - binsize * 82 + binsize / 2 else double.nan;
B32a.AssignValueColor(if bindepth32a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B32a.setLineWeight(barWeight);

rec binDepth33a = if IsNaN(close) then binDepth33a[1] else Ceil((bin33Totala / binMax) * barLength);
plot B33a = if bindepth33a >= extBar  and extBar != 0 then top - binsize * 83 + binsize / 2 else double.nan;
B33a.AssignValueColor(if bindepth33a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B33a.setLineWeight(barWeight);

rec binDepth34a = if IsNaN(close) then binDepth34a[1] else Ceil((bin34Totala / binMax) * barLength);
plot B34a = if bindepth34a >= extBar  and extBar != 0 then top - binsize * 84 + binsize / 2 else double.nan;
B34a.AssignValueColor(if bindepth34a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B34a.setLineWeight(barWeight);

rec binDepth35a = if IsNaN(close) then binDepth35a[1] else Ceil((bin35Totala / binMax) * barLength);
plot B35a = if bindepth35a >= extBar  and extBar != 0 then top - binsize * 85 + binsize / 2 else double.nan;
B35a.AssignValueColor(if bindepth35a == barLength then color.red else createColor(barColorRed,barColorGreen,barColorBlue));
B35a.setLineWeight(barWeight);

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

B1a.HideBubble();
B2a.HideBubble();
B3a.HideBubble();
B4a.HideBubble();
B5a.HideBubble();
B6a.HideBubble();
B7a.HideBubble();
B8a.HideBubble();
B9a.HideBubble();
B10a.HideBubble();
B11a.HideBubble();
B12a.HideBubble();
B13a.HideBubble();
B14a.HideBubble();
B15a.HideBubble();
B16a.HideBubble();
B17a.HideBubble();
B18a.HideBubble();
B19a.HideBubble();
B20a.HideBubble();
B21a.HideBubble();
B22a.HideBubble();
B23a.HideBubble();
B24a.HideBubble();
B25a.HideBubble();
B26a.HideBubble();
B27a.HideBubble();
B28a.HideBubble();
B29a.HideBubble();
B30a.HideBubble();
B31a.HideBubble();
B32a.HideBubble();
B33a.HideBubble();
B34a.HideBubble();
B35a.HideBubble();
