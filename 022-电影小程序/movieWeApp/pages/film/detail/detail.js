// detail.js

Page({
	data: {
		hideText: true,
		hideClass: 'up'
	},
	onLoad(params){
		const that = this;
		const id = params.id,
			  url = 'https://m.maoyan.com/movie/' + id + '.json'
		console.log(id)
		wx.request({
			url: url,
			success(res){
				console.log(res);
				let detail = res.data.data.MovieDetailModel,
				    comment = res.data.data.CommentResponseModel.hcmts.splice(0,3);   // 获取热门评论前三
				
				detail.dra = detail.dra.replace(/(<p>)|(<\/p>)/g,'');
				that.setData({
					detail: detail,
					comment: comment
				});

				console.log(that.data.detail)
			}
		})
	},
	toggleText(){
		let hideText = this.data.hideText,
			hideClass = this.data.hideClass == 'up' ? 'down' : 'up';
		this.setData({
			hideText: !hideText,
			hideClass: hideClass
		})
	}
})