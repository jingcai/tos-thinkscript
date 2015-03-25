# Price Percentage Oscillator
# Stephen Romano, 2010
#

declare lower;

input price = hlc3;
input fastLength = 9;
input slowLength = 26;
input MACDLength = 9;

def slowEma = ExpAverage(price, slowLength);
def fastEma = ExpAverage(price, fastLength);

plot PPO = (fastEma - slowEma) / slowEma;
plot PPOSignal = ExpAverage(PPO, MACDLength);

plot Diff = PPO - PPOSignal;
plot ZeroLine = 0.0;

PPO.SetDefaultColor(GetColor(1));
PPOSignal.SetDefaultColor(GetColor(8));
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.color("Positive and Up") else Diff.color("Positive and Down") else if Diff < Diff[1] then Diff.color("Negative and Down") else Diff.color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));

