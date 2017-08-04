# react-native-scrollView-uniteAnimated
React-Native ListView unite ScrollView ,Support iOS Android

## github
[https://github.com/CJELLYS/react-native-scrollView-uniteAnimated.git](https://github.com/CJELLYS/react-native-scrollView-uniteAnimated.git)

```
npm install react-native-scrollView-uniteAnimated --save

```

![image](https://github.com/CJELLYS/image/blob/master/ios.gif?raw=true)
![image](https://github.com/CJELLYS/image/blob/master/android.gif?raw=true)

## use
```
import {SpikeActivityView}  from "react-native-scrollview-unieanimated"

  render() {
        return (<View>
            <NavigatorView
                navigatorTitle='限时秒杀'
                gradient={true}
                pressBack={this._pressBack.bind(this)}
                rightView={this.editView.bind(this)}
            />
            <SpikeActivityView 
             itemsTopArray = {this.props.itemsTopArray} 
             onCureenTimeProps = {this.onCureenTime.bind(this)} 
             scrollViewSubView = {this.scrollViewSubView()} 
             topListViewStyle={{}}/>
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


