var app = getApp()
Page({
  data:{
    foodlist: [],
    animation: ''
  },

  onShow: function() {
    this.getbill(true);
    this.animation = wx.createAnimation({
      duration: 150,
      timingFunction: 'ease-in-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 100,
      transformOrigin: 'top 0'
    })
    this.animation.rotate(-3.5).step()
    this.setData({
      animation: this.animation.export()
    })
    var n=-1;
    setInterval(function () {
      // animation.translateY(-60).step()
      n = n*(-1);
      // k=(k+1)%2;
      // console.log(n);
      this.animation.rotate(7 * (n)).step()
      this.setData({
        animation: this.animation.export()
      })
    }.bind(this), 310)
  },
 
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '高校即时跑腿了解一下？',
      path: '/pages/Firstpage',
      imageUrl:'/logo.jpg',
    }
  },
  onPullDownRefresh :function(){
    this.getbill(true);
  },
  getbill: function (isFirstIn) {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/getbill",
      success: function (res) {
          length = res.data.length;
          
          that.setData({
            foodlist: res.data.data,
          });
          if(isFirstIn) {
            that.generateRandom();
          }
          wx.stopPullDownRefresh();
          console.log(res.data);
      }
    })
   
  },

  generateRandom: function() {
    var foodlist = this.data.foodlist;
    foodlist.forEach(function(item) {
      item.imagePath = '/image/' + Math.ceil(12 * Math.random()) + '.png';
    });
    this.setData({
      foodlist: foodlist,
    });
  },
  play: function (event){
    var data = event.currentTarget.dataset;
    console.log(data);
    wx.navigateTo({ url: '../Detailinfo/Detailinfo?id=' + data.id + '&goal_address=' + data.goal_address + "&hope_time=" + data.hope_time + "&remark=" + data.remark
      + '&send_address=' + data.send_address + '&send_phonenumber=' + data.send_phonenumber + '&send_username=' + data.send_username})
  },
})
