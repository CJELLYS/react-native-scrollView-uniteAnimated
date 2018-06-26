# react-native-scrollview-uniteanimated
React-Native ListView unite ScrollView ,Support iOS Android

## github
[https://github.com/CJELLYS/react-native-scrollView-uniteAnimated.git](https://github.com/CJELLYS/react-native-scrollView-uniteAnimated.git)

```
npm install react-native-scrollview-uniteanimated --save

```

![image](https://github.com/CJELLYS/image/blob/master/ios.gif?raw=true)
![image](https://github.com/CJELLYS/image/blob/master/android.gif?raw=true)

## use
```
import SpikeActivityView  from "react-native-scrollview-uniteanimated"
var ScreenHeight = Dimensions.get('window').height;
var ScreenWidth = Dimensions.get('window').width;
   
   constructor(props) {
    super(props);
    this.timeAry =[{ "title": "08:00", "subTitle": "已完毕" }, { "title": "11:00", "subTitle": "抢购中" }, { "title": "12:00", "subTitle": "抢购中" },
    { "title": "13:00", "subTitle": "即将开始" }, { "title": "14:00", "subTitle": "即将开始" }, { "title": "15:00", "subTitle": "即将开始" }, { "title": "16:00", "subTitle": "即将开始" }, { "title": "17:00", "subTitle": "即将开始" }]
  } 
   
subScrollView() {
    let ary = [];
    for (var i = 0; i < this.timeAry.length; i++) {
      if (i % 2 == 0) {
        ary.push(
        <View  key={i} style={{ backgroundColor: 'red', flex:1 }}>
        </View>)
      } else {
        ary.push(
        <View key={i} style={{ backgroundColor: 'rgb(230,100,150)', flex:1}}>
        </View>
        )
      }
    }
    return ary;
  }

  onCureenTimeProps(index) {
    console.log("===index=>>>>", index);
  }
  
  render() {
        return (
             <View style={{flex:1}}>
        <SpikeActivityView
          itemsTopArray={this.timeAry}
          fatherViewBackgroundColor={'#F0F0F0'}
          topViewStyle={{ backgroundColor: '#FC6345', height: 45, width: ScreenWidth }}
          moveIndexViewBackgroundColor={"white"}
          topViewTitleStyle={{ color: 'white', fontSize: 12 }}
          scrollViewSubView={this.subScrollView()}
          onCureenTimeProps={(index) => this.onCureenTimeProps(index)}
          moveIndexViewWidth={50}
          topTimeListViewCellWidth={70}
        />
      </View>
        )
    }
```
## method
```


```


## DefaultProps
```
SpikeActivityView.defaultProps = {
    itemsTopArray: [{ "title": "09:00", "subTitle": "已完毕" }, { "title": "11:00", "subTitle": "抢购中" }, { "title": "12:00", "subTitle": "抢购中" },
    { "title": "13:00", "subTitle": "即将开始" }, { "title": "14:00", "subTitle": "即将开始" }, { "title": "15:00", "subTitle": "即将开始" },
    { "title": "16:00", "subTitle": "即将开始" }, { "title": "17:00", "subTitle": "即将开始" }],
    onCureenTimeProps: function onCureenTimeProps() { },
    scrollViewSubView: [],
    topViewStyle: { backgroundColor: '#FC6345', height: 45, width: ScreenWidth },
    moveIndexViewBackgroundColor: "white",
    moveIndexViewWidth: 50,
    topTimeListViewCellWidth: 60,
    topViewTitleStyle: { color: 'white', fontSize: 12 },
    cureenTitleStyle:{ color: 'red', fontSize: 12 },
    fatherViewBackgroundColor: '#F0F0F0',
    needMoveLine:true
};
```


