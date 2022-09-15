<template>
  <div id="app" name="app">
    <el-container>
      <!-- 顶部导航栏 -->
      <div class="top-bar">
        <div class="nav">
          <ul>
            <li v-if="!this.$store.getters.getUser">
              <el-button type="text" @click="login">登录</el-button>
              <span class="sep">|</span>
              <el-button type="text" @click="register = true">注册</el-button>
            </li>
            <li v-else>
              欢迎
              <el-popover placement="top" width="180" v-model="visible">
                <p>确定退出登录吗？</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="logout">确定</el-button>
                </div>
                <el-button type="text" slot="reference">{{this.$store.getters.getUser.userName}}</el-button>
              </el-popover>
            </li>
            <li>
              <router-link to="/order">我的订单</router-link>
            </li>
            <li>
              <router-link to="/collect">我的收藏</router-link>
            </li>
            <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
              <router-link to="/shoppingCart">
                <i class="el-icon-shopping-cart-full"></i> 购物车
                <span class="num">({{getNum}})</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 顶部导航栏END -->

      <!-- 顶栏容器 -->
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
              <img src="./assets/images/logo.png" alt />
            </router-link>
          </div>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/goods">全部商品</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>

          <div class="search">
            <el-input placeholder="请输入搜索内容" v-model="search">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
          </div>
        </el-menu>
      </el-header>
      <!-- 顶栏容器END -->

      <!-- 登录模块 -->
      <MyLogin></MyLogin>
      <!-- 注册模块 -->
      <!-- <MyRegister :register="register" @fromChild="isRegister"></MyRegister> -->

      <!-- 主要区域容器 -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <!-- 主要区域容器END -->

      <!-- 底栏容器 -->
      <el-footer>
        <div class="footer">
          <div class="content">
              <p class="text">
                <a class="icon1" href="javascript:;">7天无理由退换货</a>
                <a class="icon2" href="javascript:;">满99元全场免邮</a>
                <a class="icon3" style="margin-right: 0" href="javascript:;">100%品质保证</a>
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
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  beforeUpdate() {
    this.activeIndex = this.$route.path;
  },
  data() {
    return {
      activeIndex: "", // 头部导航栏选中的标签
      search: "", // 搜索条件
      register: false, // 是否显示注册组件
      visible: false // 是否退出登录
    };
  },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("user")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(localStorage.getItem("user")));
    }
  },
  computed: {
    ...mapGetters(["getUser", "getNum"])
  },
  watch: {
    // 获取vuex的登录状态
    getUser: function(val) {
      if (val === "") {
        // 用户没有登录
        this.setShoppingCart([]);
      } else {
        // 用户已经登录,获取该用户的购物车信息
        this.$axios
          .post("/api/user/shoppingCart/getShoppingCart", {
            user_id: val.user_id
          })
          .then(res => {
            if (res.data.code === "001") {
              // 001 为成功, 更新vuex购物车状态
              this.setShoppingCart(res.data.shoppingCartData);
            } else {
              // 提示失败信息
              this.notifyError(res.data.msg);
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
    }
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),
    login() {
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
    // 退出登录
    logout() {
      this.visible = false;
      // 清空本地登录信息
      localStorage.setItem("user", "");
      // 清空vuex登录信息
      this.setUser("");
      this.notifySucceed("成功退出登录");
    },
    // 接收注册子组件传过来的数据
    isRegister(val) {
      this.register = val;
    },
    // 点击搜索按钮
    searchClick() {
      if (this.search != "") {
        // 跳转到全部商品页面,并传递搜索条件
        this.$router.push({ path: "/goods", query: { search: this.search } });
        this.search = "";
      }
    }
  }
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
	padding: 20px 0;
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
