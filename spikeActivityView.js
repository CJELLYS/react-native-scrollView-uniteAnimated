import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ListView,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    InteractionManager,
    Platform,
    Animated
} from 'react-native';


var ScreenHeight = Dimensions.get('window').height;
var ScreenWidth = Dimensions.get('window').width;
export class SpikeActivityView extends Component {
    constructor(props) {
        super(props);
        this.outerViewY = 0,
        this.outerViewHeight = 0;
        this.scrollViewY = 0;//ScrollView layout.y
        this.moveViewX = 0; // Animated.View layout.x
        this.startTouchingX = 0,// 手指触摸点x相对屏幕的绝对位置(Finger touch point x relative to the absolute position of the screen)
        this.startMovingX = 0,// 手指移动点x相对屏幕的绝对位置 (Finger move point x relative to screen absolute position)
        this.ifStopMove = false;//手指是否离开ScrollView (Do your fingers leave ScrollView)
        this.ifOnCureenTime = false;//是否点击了标题  (Did you click on the title)
        this.previousIndex = 0;//前一个下标 (Previous subscript)
        this.ifNeedMoveView = false;//是否需要移动view(Do you need to move View)
        this.state = {
            spikeActivityTimeList: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            cureenTimeIndex: 0,//当前的选择下标(The current selection subscript)
            timeListLength: 0,//标题的长度(title Array Length)
            moveXAnimated: 0,//view X轴移动的位置(The view position of the X axis)
        };

        this.topCellWidth = this.props.topCellStyle.width;
        this.defaultTopCellWidth = this.topCellWidth?this.topCellWidth:60;
        this.currLength = parseInt(ScreenWidth/this.defaultTopCellWidth)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
             var timeAry = this.props.itemsTopArray;
           
            if (Platform.OS != 'ios') {
                timeAry.push({})
            }
            this.setState({
                spikeActivityTimeList: this.state.spikeActivityTimeList.cloneWithRows(timeAry),
                timeListLength: Platform.OS == 'ios' ? timeAry.length : timeAry.length - 1,
            })
        })
    }

    componentWillUnmount() {

    }

    onCureenTime(rowDate, rowID) {
        this.ifNeedMoveView = false;
        this.ifStopMove = false;
        this.ifOnCureenTime = true;
        this.setState({
            cureenTimeIndex: Number(rowID),
        })
        if (Number(rowID) <= this.currLength) {
            this.refs.topTimeListView.scrollTo({ x: 0, y: 0, animated: true })
            this.setState({
                moveXAnimated: Number(rowID) * this.defaultTopCellWidth 
            })
        } else {
            this.setState({
                moveXAnimated: this.currLength * this.defaultTopCellWidth 
            })
            this.refs.topTimeListView.scrollTo({ x: this.defaultTopCellWidth  * (Number(rowID) - this.currLength), y: 0, animated: true })
        }

        this.refs.scrollView.scrollTo({ x: Number(rowID) * ScreenWidth, y: 0, animated: true })
        this.props.onCureenTimeProps(rowDate, rowID);
    }

    _onLayoutOuterView(event) {
        this.outerViewY = event.nativeEvent.layout.y;
        this.outerViewHeight = event.nativeEvent.layout.height;
    }

    _onLayoutView(event) {
        this.moveViewX = event.nativeEvent.layout.x;
    }

    _onLayoutScrollView(event) {
        this.scrollViewY = event.nativeEvent.layout.y;
    }

    onScrollTopListView(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        if (this.ifNeedMoveView) {
            this.setState({
                moveXAnimated: -offsetX + this.state.cureenTimeIndex * this.defaultTopCellWidth 
            })
        }
    }

    _onTouchStartListView(event) {
        this.ifNeedMoveView = true;
    }

    onScroll(event) {
        this.ifNeedMoveView = false;
        let offsetX = event.nativeEvent.contentOffset.x;

        this.setState({
            cureenTimeIndex: offsetX / ScreenWidth,
        })

    
        if (this.ifStopMove || (Platform.OS == 'android' && this.ifOnCureenTime == false)) {
             this.previousIndex = this.state.cureenTimeIndex.toFixed(0);
            if (this.previousIndex <= this.currLength) {
                this.refs.topTimeListView.scrollTo({ x: 0, y: 0, animated: true })
                this.setState({
                    moveXAnimated: this.previousIndex * this.defaultTopCellWidth 
                })
            } else {
                this.refs.topTimeListView.scrollTo({ x: this.defaultTopCellWidth  * (this.previousIndex - this.currLength), y: 0, animated: true })
                if (this.moveViewX != this.currLength * this.defaultTopCellWidth ) {
                    this.setState({
                        moveXAnimated: this.currLength * this.defaultTopCellWidth 
                    })
                }
            }
        }
    }

    _onTouchStart(event) {//开始触摸
        this.ifStopMove = false;
        this.ifOnCureenTime = false;
        this.startTouchingX = event.nativeEvent.pageX;
    }

    onTouchMove(event) {//开始移动
        this.startMovingX = event.nativeEvent.pageX;
        this.ifStopMove = false;
        if (this.previousIndex < this.currLength && Platform.OS == 'ios') {
            this.setState({
                moveXAnimated: (this.startTouchingX - this.startMovingX) * this.defaultTopCellWidth  / ScreenWidth + this.previousIndex * this.defaultTopCellWidth 
            })
        }
    }

    _onTouchEnd(event) {//移动结束
        this.ifStopMove = true;
    }

    spikeActivityTimeCell(rowDate, sectionID, rowID) {
        
        return (<TouchableOpacity onPress={() => this.onCureenTime(rowDate, rowID)} activeOpacity={1}>
            <View style={[{ width:this.defaultTopCellWidth , height: this.topViewHeight ? this.topViewHeight:45, justifyContent: 'center', alignItems: 'center' },this.props.topCellStyle]}>
                <Text style={[{ color: 'white', fontSize: 12 },this.props.topCellTitleStyle]}>{rowDate.title}</Text>
                <Text style={[{ color: 'white', fontSize: 12, marginTop: 3 },this.props.topCellTitleStyle]}>{rowDate.subTitle}</Text>
            </View>
        </TouchableOpacity>)
    }

    render() {

        this.topViewHeight = this.props.topListViewStyle.height;
        return (
            <View onLayout={(event) => this._onLayoutOuterView(event)}
                style={[{ width: ScreenWidth, height: ScreenHeight - this.outerViewY, flexDirection: 'column', backgroundColor: '#F0F0F0' }]}>

                <View style={[{ backgroundColor: '#FC6345', height: this.topViewHeight? this.topViewHeight:45, width: ScreenWidth },this.props.topListViewStyle]}>
                    <ListView ref={"topTimeListView"}
                        dataSource={this.state.spikeActivityTimeList}
                        renderRow={this.spikeActivityTimeCell.bind(this)}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        horizontal={true}
                        contentContainerStyle={{ height:this.topViewHeight? this.topViewHeight:45 }}
                        onScroll={(event) => this.onScrollTopListView(event)}
                        onTouchStart={(event) => this._onTouchStartListView(event)}
                    >
                    </ListView>

                    <Animated.View style={{ backgroundColor: 'white', height: 2, width: this.defaultTopCellWidth-10, position: 'absolute', left: 5 + this.state.moveXAnimated, bottom: 0 }}
                        onLayout={(event) => this._onLayoutView(event)}
                    />
                </View>
                <ScrollView ref={"scrollView"}
                    onLayout={(event) => this._onLayoutScrollView(event)}
                    contentContainerStyle={{ flexDirection: 'row', backgroundColor: 'red', width: ScreenWidth * this.state.timeListLength, height: this.outerViewHeight - this.scrollViewY }}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                    onScroll={(event) => this.onScroll(event)}
                    onTouchEnd={(event) => this._onTouchEnd(event)}
                    onTouchStart={(event) => this._onTouchStart(event)}
                    onTouchMove={(event) => this.onTouchMove(event)}
                    scrollEventThrottle={Platform.OS == 'ios' ? 50 : 16}
                >
                    {this.props.scrollViewSubView}
                </ScrollView>

            </View> 
      
        )
    }
}


SpikeActivityView.defaultProps = {
    itemsTopArray:  [{ "title": "09:00", "subTitle": "已完毕" }, { "title": "11:00", "subTitle": "抢购中" }, { "title": "12:00", "subTitle": "抢购中" },
    { "title": "13:00", "subTitle": "即将开始" }, { "title": "14:00", "subTitle": "即将开始" }, { "title": "15:00", "subTitle": "即将开始" },
    { "title": "16:00", "subTitle": "即将开始" }, { "title": "17:00", "subTitle": "即将开始" }],
    onCureenTimeProps: function onCureenTimeProps() { },
    scrollViewSubView: [],
    topListViewStyle:{},
    topCellStyle:{},
    topCellTitleStyle:{},
};

var styles = StyleSheet.create({

});