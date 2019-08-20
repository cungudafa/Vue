 <template>
    <div>
        <h1>主页面</h1>
        欢迎你!
        <span v-if="user"> {{user.name}}
            <el-button type="warning"  @click="logout">注销</el-button>
        </span>
        <el-button v-else type="success" @click="login">点击登录</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            login () {
                this.$router.replace('/login')
            },
            logout () {
                this.$store.dispatch('logout').then(() => {
                    this.$router.replace('/login')
                })
            }
        },
        computed: {
            user () {
              //console.log(this.$store.state)
              return this.$store.state.user
            }
        }
    }
</script>
