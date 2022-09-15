<template>
	<div>
		<!-- 头部模块 -->
		<div class="title">
			<p>{{ productInfo.product_name }}</p>
		</div>
		<!-- 主体部分 -->
		<div class="main">
			<!-- 主体左侧轮播图 -->
			<div class="lbt">
				<el-carousel height="560px">
					<el-carousel-item v-for="item in productPic" :key="item.id">
						<h3 class="small">
							<img :src="$target + item.product_picture" />
						</h3>
					</el-carousel-item>
				</el-carousel>
			</div>
			<!-- 主体右侧详情信息 -->
			<div class="info">
				<h1 class="name">{{ productInfo.product_name }}</h1>
				<p class="intro">{{ productInfo.product_intro }}</p>
				<p class="store">小米自营</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// 商品id
			productID: "",
			// 商品信息
			productInfo: {},
			// 商品轮播图图片路径
			productPic: [],
		};
	},
	activated() {
		// 通过链接query传递商品id
		if (this.$route.query.productID != undefined) {
			this.productID = this.$route.query.productID;
			// console.log(this.productID);
			this.getProductById(this.productID);
			this.getPicById(this.productID);
		}
	},

	methods: {
		// 通过id获取商品信息
		getProductById(id) {
			this.$http
				.post("/product/getDetails", { productID: id })
				.then((result) => {
					this.productInfo = result.data.Product[0];
					console.log(result.data.Product[0]);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		// 通过id获取图片地址
		getPicById(id) {
			this.$http
				.post("/product/getDetailsPicture/", { productID: id })
				.then((result) => {
					this.productPic = result.data.ProductPicture;
					console.log(result.data.ProductPicture);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},

	// watch:{
	//     productID:((val)=>{
	//         console.log(val);
	//     })
	// }
};
</script>

<style scoped>
/* 标题 */
.title {
	height: 65px;
	line-height: 65px;
	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
/* 标题内文字 */
.title p {
	display: block;
	width: 1225px;
	font-size: 20px;
	font-weight: 400;
	color: #212121;
	margin: 0 auto;
}
/* 主体 */
.main {
	width: 1225px;
	height: 560px;
	margin: 0 auto;
}
/* 主体左侧轮播图 */
.lbt {
	width: 560px;
	height: 100%;
	float: left;
}
/* 主体右侧信息 */
.info {
	width: 640px;
	height: 100%;
	float: left;
}
/* 图片 */
img {
	width: 560px;
	height: 560px;
}
</style>
