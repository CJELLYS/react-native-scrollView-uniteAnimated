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
import {SpikeActivityView}  from "react-native-scrollview-unieanimated"
  
 subScrollView(){
        let ary = [];
        for (var i = 0; i < this.timeAry.length; i++) {
            if (i % 2 == 0) {
                ary.push(<View style={{ backgroundColor: 'rgb(30,130,100)', width: ScreenWidth, height: ScreenHeight - 60 }}>
                </View>)
            } else {
                ary.push(<View style={{ backgroundColor: 'rgb(230,100,150)', width: ScreenWidth, height: ScreenHeight - 60 }}>
                </View>)
            }
        }
        return ary;
    }
   
 onCureenTimeProps(index){
        console.log("====>>>>",index);
    }
  
  render() {
        return (<View>
            <NavigatorView
                navigatorTitle='限时秒杀'
                gradient={true}
                pressBack={this._pressBack.bind(this)}
                rightView={this.editView.bind(this)}
            />
            <SpikeActivityView 
                    fatherViewBackgroundColor= {'#F0F0F0'}
                    topViewStyle={{ backgroundColor: '#FC6345', height: 45, width: ScreenWidth }}
                    moveIndexViewBackgroundColor={"white"}
                    topViewTitleStyle= {{ color: 'white', fontSize: 12 }}
                    scrollViewSubView={this.subScrollView()}
                    onCureenTimeProps={(index)=>this.onCureenTimeProps(index)}
                    moveIndexViewWidth={$n_px(50)}
                    topTimeListViewCellWidth={$n_px(70)}
                />
        </View>
        )
    }
```
## DefaultProps
```
SpikeActivityView.defaultProps = {
    itemsTopArray:  [],//topListView dataSource
    onCureenTimeProps: function onCureenTimeProps() { },//topListView renderRow onPress function
    scrollViewSubView: [],//scrollView SubView,The quantity is the itemsTopArray.length as above
    topListViewStyle:{},
    topCellStyle:{},
    topCellTitleStyle:{},
};
```


