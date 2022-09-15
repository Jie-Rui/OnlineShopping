<template>
	<div>
		<div class="title">
			<div class="content">
				<i class="el-icon-chat-round"></i>
				关于我们
			</div>
		</div>

		<div class="main">
			<vue-markdown :source="md"></vue-markdown>
		</div>
	</div>
</template>

<script>
import VueMarkdown from "vue-markdown";
const articleList = require("../../../README.md");
export default {
	name: "about",
	components: {
		VueMarkdown,
	},
	data() {
		return {
			md: articleList,
		};
	},
};
</script>

<style scoped>
/* 标题 */
.title {
	height: 65px;
	line-height: 65px;
	border-bottom: 3px solid #ff6700;
}
/* 标题内文字 */
.title .content {
	display: block;
	height: 100%;
	width: 1225px;
	font-size: 28px;
	font-weight: 400;
	color: #212121;
	margin: 20px auto 0;
}
.el-icon-chat-round{
    color: #ff6700;
}
/* 主体 */
.main {
	width: 1225px;
	margin: 0 auto;
	background-color: #fff;
}
</style>
