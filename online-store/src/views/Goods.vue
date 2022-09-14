<template>
	<div class="goods">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item to="/">首页</el-breadcrumb-item>
			<el-breadcrumb-item>全部商品</el-breadcrumb-item>
			<el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
			<el-breadcrumb-item v-else>分类</el-breadcrumb-item>
			<el-breadcrumb-item v-if="search">{{ search }}</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 分类tab -->

		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane
				v-for="item in categoryList"
				:label="item.category_name"
				:key="item.category_id"
				:name="'' + item.category_id"
			></el-tab-pane>
		</el-tabs>

		<div class="main">
			<div class="list">
				<MyList :list="product" v-if="product.length > 0"></MyList>
				<div v-else class="none-product">
					抱歉没有找到相关的商品，请看看其他的商品
				</div>
			</div>
			<div>
				<el-pagination
					background
					layout="prev, pager, next"
					:page-size="pageSize"
					:total="total"
					@current-change="currentChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//分类列表
			categoryList: "",
			categoryID: [], // 分类id
			product: "", // 商品列表
			productList: "",
			total: 0, // 商品总量
			pageSize: 15, // 每页显示的商品数量
			currentPage: 1, //当前页码
			activeName: 0, // 分类列表当前选中的id
			search: "", // 搜索条件
		};
	},
	created() {
		this.getCategory();
		this.getData();
	},
	methods: {
		getCategory() {
			// console.log("123456");
			this.$http
				.post("/product/getCategory")
				.then((result) => {
					const val = {
						category_id: 0,
						category_name: "全部",
					};
					// console.log(result);
					const cate = result.data.category;
					cate.unshift(val);
					// console.log(this.categoryList);
					this.categoryList = cate;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		handleClick(index) {
			// console.log(index.index);
			// console.log("tabindex", index.index);
			if (index.index == 0) {
				this.categoryID = [];
			}
			if (index.index > 0) {
				this.categoryID = [Number(index.index)];
			}
			// 初始化商品总量和当前页码
			this.total = 0;
			this.currentPage = 1;
			this.$router.push({
				path: "/goods",
				query: { categoryID: this.categoryID },
			});
		},
		// 向后端请求全部商品或分类商品数据
		getData() {
			// 如果分类列表为空则请求全部商品数据，否则请求分类商品数据
			const api =
				this.categoryID.length == 0
					? "/product/getAllProduct"
					: "/product/getProductByCategory";

			// console.log("api", api);
			this.$http
				.post(api, {
					categoryID: this.categoryID,
					currentPage: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					// console.log(res);
					this.product = res.data.Product;
					this.total = res.data.total;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		// 当前页码改变
		currentChange(index) {
			this.currentPage = index;
			if (this.search != "") {
				this.getProductBySearch();
			} else {
				this.getData();
			}
			this.backtop();
		},
		// 返回顶部
		backtop() {
			const timer = setInterval(function () {
				const top =
					document.documentElement.scrollTop ||
					document.body.scrollTop;
				const speed = Math.floor(-top / 5);
				document.documentElement.scrollTop = document.body.scrollTop =
					top + speed;

				if (top === 0) {
					clearInterval(timer);
				}
			}, 20);
		},
	},
	watch: {
		// activeName: (val) => {
		// 	console.log("val", val);
		// },

		categoryID: function () {
			this.getData();
			// console.log("this.product", this.product);
			// console.log("this.total", this.total);
		},
	},
};
</script>

<style scoped>
.goods .main {
	background-color: #f5f5f5;
}
.goods .el-breadcrumb {
	height: 30px;
	background-color: white;
	width: 1225px;
	line-height: 30px;
	font-size: 16px;
	margin: 10px auto;
}
.el-tabs {
	width: 1225px;
	height: 40px;
	line-height: 40px;
	margin: 0 auto;
	text-align: center;
}
.list {
	overflow: auto;
	padding-top: 14.5px;
	margin-left: 93px;
}
.el-pagination{
	text-align: center;
}
</style>
