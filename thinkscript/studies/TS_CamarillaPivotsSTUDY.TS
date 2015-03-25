# CAMARILLAPIVOTS
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 08 Feb 2009

input timeFrame = {default DAY, WEEK, MONTH};
input showOnlyToday = no;

def H = high(period = timeFrame)[1];
def L = low(period = timeFrame)[1];
def C = close(period = timeFrame)[1];
def R = H-L;

def calc_PP = (H + L + C) / 3;
def calc_H1 = C+(R*1.1/12);
def calc_H2 = C+(R*1.1/6);
def calc_H3 = C+(R*1.1/4);
def calc_H4 = C+(R*1.1/2);
def calc_L1 = C-(R*1.1/12);
def calc_L2 = C-(R*1.1/6);
def calc_L3 = C-(R*1.1/4);
def calc_L4 = C-(R*1.1/2);

plot H4;
plot H3;
plot H2;
plot H1;
plot PP;
plot L1;
plot L2;
plot L3;
plot L4;
PP.hide();
H1.hide();
H2.hide();
L1.hide();
L2.hide();

if (showOnlyToday and !IsNaN(close(period = timeFrame)[-1])) or(getAggregationPeriod() > if timeframe == timeframe.DAY then AggregationPeriod.DAY else if timeframe == timeframe.WEEK then AggregationPeriod.WEEK else AggregationPeriod.MONTH)
then {    
    H1 = Double.NaN;    
    H2 = Double.NaN;    
    H3 = Double.NaN;    
    H4 = Double.NaN;    
    PP = Double.NaN;    
    L1 = Double.NaN;    
    L2 = Double.NaN;    
    L3 = Double.NaN;    
    L4 = double.NaN;
} 
else {    
    H1 = calc_H1;    
    H2 = calc_H2;    
    H3 = calc_H3;    
    H4 = calc_H4;    
    PP = calc_PP;    
    L1 = calc_L1;    
    L2 = calc_L2;    
    L3 = calc_L3;    
    L4 = calc_L4;
}

PP.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);
H1.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);
H2.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);
H3.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);
H4.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);L1.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);
L2.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);
L3.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);
L4.SetPaintingStrategy(if timeframe == timeframe.DAY then PaintingStrategy.LINE_VS_POINTS else if timeframe == timeframe.WEEK then PaintingStrategy.LINE_VS_TRIANGLES else PaintingStrategy.LINE_VS_SQUARES);

PP.SetDefaultColor(GetColor(0));
H1.SetDefaultColor(GetColor(5));
H2.SetDefaultColor(GetColor(5));
H3.SetDefaultColor(GetColor(5));
H4.SetDefaultColor(GetColor(5));
L1.SetDefaultColor(GetColor(6));
L2.SetDefaultColor(GetColor(6));
L3.SetDefaultColor(GetColor(6));
L4.SetDefaultColor(GetColor(6));

PP.SetStyle(Curve.POINTS);
H1.SetStyle(Curve.POINTS);
H2.SetStyle(Curve.POINTS);
H3.SetStyle(Curve.POINTS);
H4.SetStyle(Curve.POINTS);
L1.SetStyle(Curve.POINTS);
L2.SetStyle(Curve.POINTS);
L3.SetStyle(Curve.POINTS);
L4.SetStyle(Curve.POINTS);


