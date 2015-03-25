# Modified version of the packaged thinkorswim VolumeProfile indicator/study
# Stephen Romano, 2010

input pricePerRowHeightMode = {default AUTOMATIC, TICKSIZE, CUSTOM};
input customRowHeight = 1.0;
input timePerProfile = {default CHART, HOUR, DAY, "2 DAYS", "3 DAYS", "4 DAYS", WEEK, MONTH, "OPT EXP"};
input profiles = 1000;
input onExpansion = yes;

input profileR = 102;
input profileG = 102;
input profileB = 102;

def period;
switch (timePerProfile) {
case CHART:
    period = AggregationPeriod.CHART;
case HOUR:
    period = AggregationPeriod.HOUR;
case DAY:
    period = AggregationPeriod.DAY;
case "2 DAYS":
    period = AggregationPeriod.TWO_DAYS;
case "3 DAYS":
    period = AggregationPeriod.THREE_DAYS;
case "4 DAYS":
    period = AggregationPeriod.FOUR_DAYS;
case WEEK:
    period = AggregationPeriod.WEEK;
case MONTH:
    period = AggregationPeriod.MONTH;
case "OPT EXP":
    period = AggregationPeriod.OPT_EXP;
}

def height;
switch (pricePerRowHeightMode) {
case AUTOMATIC:
    height = PricePerRow.AUTOMATIC;
case TICKSIZE:
    height = PricePerRow.TICKSIZE;
case CUSTOM:
    height = customRowHeight;
}

DefineGlobalColor("Profile", CreateColor(profileR, profileG, profileB));
addProfile(Profile.VOLUME, "timePerProfile" = period, "onExpansion" = onExpansion, "numberOfProfiles" = profiles, "pricePerRow" = height, "color" = CreateColor(profileR, profileG, profileB));

