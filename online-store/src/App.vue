<template>
	<div id="app">
		<el-container>
			<!-- 顶部导航栏 -->
			<div class="top-bar">
				<div class="nav">
					<ul>
						<li>
							<el-button type="text">登录</el-button>
							<span class="sep">|</span>
							<el-button type="text">注册</el-button>
						</li>
						<li>
							<router-link to="order">我的订单</router-link>
						</li>
						<li>
							<router-link to="collect">我的收藏</router-link>
						</li>
						<li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
							<router-link to="/shoppingCart">
								<i class="el-icon-shopping-cart-full"></i> 购物车
                <span class="num">({{ getNum }})</span>
							</router-link>
						</li>
					</ul>
				</div>
			</div>

			<!-- 顶部 header 区域 -->
			<el-header>
				<el-menu
					:default-active="activeIndex"
					class="el-menu-demo"
					mode="horizontal"
					active-text-color="#409eff"
					router
				>
					<div class="logo">
						<router-link to="/">
							<img src="./assets/images/logo.png" alt="" />
						</router-link>
					</div>
					<el-menu-item index="/">首页</el-menu-item>
					<el-menu-item index="/goods">全部商品</el-menu-item>
					<el-menu-item index="/about">关于我们</el-menu-item>
					<div class="search">
						<el-input placeholder="请输入搜索内容" v-model="search">
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</div>
				</el-menu>
			</el-header>

      <!-- 商品内容区域 -->
			<el-main>
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</el-main>

			<!-- 底部 footer 区域 -->
			<el-footer>
				<div class="footer">
					<div class="content">
						<p class="text">
							<a class="icon1" href="javascript:;">7天无理由退换货</a>
							<a class="icon2" href="javascript:;">满99元全场免邮</a>
							<a class="icon3" style="margin-right: 0" href="javascript:;"
								>100%品质保证</a
							>
						</p>
					</div>
					<div class="source">
						<a
							href="https://github.com/Jie-Rui/Shop-Store/tree/main/vue-store"
							target="_blank"
						>
							<div class="source-img"></div>
						</a>
					</div>
					<div class="help">
						<p>
							<router-link to="/">首页</router-link>
							<span>|</span>
							<router-link to="/goods">全部商品</router-link>
							<span>|</span>
							<router-link to="/about">关于我们</router-link>
						</p>
						<p class="copyright">商城版权所有 &copy; 2021-2022</p>
					</div>
				</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeIndex: "", // 头部导航栏选中的标签
			search: "", 
      getNum: 0
		};
	},
};
</script>

<style lang="less" scoped>
/* 全局样式css */
* {
	padding: 0;
	margin: 0;
	border: 0;
	list-style: none;
}
#app .el-header {
	padding: 0;
}
#app .el-main {
	min-height: 300px;
	padding: 0;
}
#app .el-footer {
	padding: 0;
}
a,
a:hover {
	text-decoration: none;
}

/* 顶部 nav 区域 */
.top-bar {
	height: 40px;
	background-color: #3d3d3d;
	margin-bottom: 20px;
	.nav {
		width: 1225px;
		margin: 0 auto;
		ul {
			float: right;
		}
		li {
			float: left;
			height: 40px;
			color: #b0b0b0;
			font-size: 14px;
			text-align: center;
			line-height: 40px;
			margin-left: 20px;
			.el-button {
				color: #b0b0b0;
			}
			.el-button:hover {
				color: #fff;
			}
			a {
				color: #b0b0b0;
			}
			a:hover {
				color: #fff;
			}
		}
		.sep {
			color: #b0b0b0;
			font-size: 12px;
			margin: 0 5px;
		}
		.shopCart {
			width: 120px;
			background-color: #424242;
		}
		.shopCart:hover {
			background-color: #fff;
		}
		.shopCart:hover a {
			color: #ff6700;
		}
		.shopCart-full {
			width: 120px;
			background-color: #ff6700;
		}
		.shopCart-full a {
			color: #fff;
		}
	}
}

/* 顶部 header 区域 */
.el-header {
	.el-menu {
		max-width: 1225px;
		margin: 0 auto;
	}
	.logo {
		width: 189px;
		height: 60px;
		float: left;
		margin-right: 100px;
	}
	.search {
		width: 300px;
		margin-top: 10px;
		float: right;
	}
}

/* 底部 footer 区域 */
.footer {
	width: 100%;
	text-align: center;
	background-color: #2f2f2f;
	padding-bottom: 20px;
	.content {
		margin: 0 auto;
		border-bottom: 1px solid #3d3d3d;
		line-height: 145px;
		a {
			display: inline-block;
			height: 40px;
			margin-right: 210px;
			padding-left: 44px;
			line-height: 40px;
			color: #fff;
			font-size: 20px;
			text-decoration: none;
			background: url("./assets/images/us-icon.png") no-repeat left 0;
		}
	}
	.source {
		height: 50px;
		line-height: 50px;
		margin-top: 20px;
		.source-img {
			width: 50px;
			height: 50px;
			margin: 0 auto;
			background: url("./assets/images/github.png") no-repeat;
		}
	}
	.help {
		text-align: center;
		color: #888888;
		p {
			margin: 20px 0 16px 0;
			a {
				text-decoration: none;
				color: #888888;
			}
			a:hover {
				color: #fff;
			}
			span {
				padding: 0 22px;
			}
		}
	}
}
</style>
