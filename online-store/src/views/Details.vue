<template>
	<div id="details">
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
				<!-- 上部详情信息 -->
				<h1 class="name">{{ productInfo.product_name }}</h1>
				<p class="intro">{{ productInfo.product_intro }}</p>
				<p class="store">小米自营</p>
				<div class="price">
					<span>{{ productInfo.product_selling_price }}元</span>
					<span
						v-show="
							productInfo.product_price !=
							productInfo.product_selling_price
						"
						class="del"
						>{{ productInfo.product_price }}元</span
					>
				</div>
				<!-- 中部价格 -->
				<el-card v-model="productInfo">
					<div class="name">
						{{ productInfo.product_name }}
					</div>
					<div class="price">
						<span>{{ productInfo.product_selling_price }}元</span>
						<span
							v-show="
								productInfo.product_price !=
								productInfo.product_selling_price
							"
							class="del"
							>{{ productInfo.product_price }}元</span
						>
					</div>
					<p class="price-sum">
						总计 : {{ productInfo.product_selling_price }}元
					</p>
				</el-card>

				<!-- 下部按钮 -->
				<div class="button">
					<el-button
						class="addCar el-icon-shopping-cart-1"
						:disable="disable"
						@click="addShoppingCart"
						>加购物车</el-button
					>
					<el-button class="addCollect el-icon-star-off" @click="addCollect">
						加收藏
					</el-button>
				</div>

				<!-- 底部优势 -->
				<div class="policy">
					<ul>
						<li><i class="el-icon-circle-check"></i> 小米自营</li>
						<li><i class="el-icon-circle-check"></i> 小米发货</li>
						<li>
							<i class="el-icon-circle-check"></i> 7天无理由退货
						</li>
						<li>
							<i class="el-icon-circle-check"></i> 7天价格保护
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data() {
		return {
			// 商品id
			productID: "",
			// 商品信息
			productInfo: {},
			// 商品轮播图图片路径
			productPic: [],
			// 控制加车按钮是否可用
			disable: false,
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
		...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),
		// 通过id获取商品信息
		getProductById(id) {
			this.$http
				.post("/api/product/getDetails", { productID: id })
				.then((result) => {
					this.productInfo = result.data.Product[0];
					// console.log(result.data.Product[0]);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		// 通过id获取图片地址
		getPicById(id) {
			this.$http
				.post("/api/product/getDetailsPicture/", { productID: id })
				.then((result) => {
					this.productPic = result.data.ProductPicture;
					// console.log(result.data.ProductPicture);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		// 加入购物车
		addShoppingCart() {
			// 判断是否登录,没有登录则显示登录组件
			if (!this.$store.getters.getUser) {
				this.$store.dispatch("setShowLogin", true);
				return;
			}
			this.$http
				.post("/api/user/shoppingCart/addShoppingCart", {
					user_id: this.$store.getters.getUser.user_id,
					product_id: this.productID,
				})
				.then((res) => {
					switch (res.data.code) {
						case "001":
							// 新加入购物车成功
							this.unshiftShoppingCart(
								res.data.shoppingCartData[0]
							);
							this.notifySucceed(res.data.msg);
							break;
						case "002":
							// 该商品已经在购物车，数量+1
							this.addShoppingCartNum(this.productID);
							this.notifySucceed(res.data.msg);
							break;
						case "003":
							// 商品数量达到限购数量
							this.dis = true;
							this.notifyError(res.data.msg);
							break;
						default:
							this.notifyError(res.data.msg);
					}
				})
				.catch((err) => {
					return Promise.reject(err);
				});
		},
		addCollect() {
			// 判断是否登录,没有登录则显示登录组件
			if (!this.$store.getters.getUser) {
				this.$store.dispatch("setShowLogin", true);
				return;
			}
			this.$http
				.post("/api/user/collect/addCollect", {
					user_id: this.$store.getters.getUser.user_id,
					product_id: this.productID,
				})
				.then((res) => {
					if (res.data.code == "001") {
						// 添加收藏成功
						this.notifySucceed(res.data.msg);
					} else {
						// 添加收藏失败
						this.notifyError(res.data.msg);
					}
				})
				.catch((err) => {
					return Promise.reject(err);
				});
		},
	},
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
	margin: 10px auto;
}
/* 主体左侧轮播图 */
.lbt {
	width: 560px;
	height: 560px;
	float: left;
}

/* 主体右侧信息 */
.info {
	width: 640px;
	height: 100%;
	float: right;
}
/* 主体右侧内容间距 */
.intro, .store  , .el-card , .button ,.policy{
	margin: 30px auto;
}
.name , .price , .price-sum{
	margin: 10px auto;
}

/* 图片 */
img {
	width: 560px;
	height: 560px;
}
/* 中划线价格 */
.del {
	font-size: 14px;
	color: #b0b0b0;
	text-decoration: line-through;
}

/* 简介 */
.intro {
	font-size: 14px;
	color: #b0b0b0;
}

/* 颜色 */
.store,
.price,
.price-sum {
	color: #ff6700;
	font-size: 18px;
}
/* 中部价格 */
.el-card {
	position: relative;
	height: 80px;
	/* margin: 20px 0; */
}

.el-card .name {
	/* float: left; */
	position: absolute;
	left: 10px;
	top: 0;
}

.el-card .price {
	/* float: right; */
	position: absolute;
	right: 10px;
	top: 0;
}

.el-card .price-sum {
	/* float: left;
	margin: 30px 0px 10px -111px; */
	position: absolute;
	left: 10px;
	bottom: 0;
}

/* 按钮 */
.el-button {
	float: left;
	height: 55px;
	font-size: 16px;
	color: #fff;
	border: none;
	text-align: center;

}
.addCar {
	width: 340px;
	background-color: #ff6700;
}
.addCollect {
	width: 260px;
	background-color: #b0b0b0;
}

/* 优势 */
.policy {
	/* margin-top: 20px; */
	padding-top: 60px;
	margin-left: -40px;
}
.policy ul {
	margin-left: 50px;
}
.policy ul li {
	float: left;
	list-style: none;
	color: #b0b0b0;
	margin-right: 10px;
}
</style>
