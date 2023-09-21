<template>
  <div
    class="app-slide flex-column justify-between over-hidden"
    :style="slideStyle"
  >
    <div class="flex-column app-slide-up flex-1">
      <p class="center-center object-cover logo-box">
        <img width="172" :src="require('@/assets/logo.png')" />
      </p>
      <div class="flex-column justify-between flex-1">
        <div class="flex-1">
          <div
            class="nav-box"
            v-for="(item, idx) in routesIndexData"
            index="idx"
            :key="idx"
          >
            <div class="nav-doc">
              <p
                class="group align-center cursor-pointer"
                :class="{
                  active:
                    $route.path == item.url ||
                    (item.childList || []).some((v) => v.url == $route.path),
                }"
                @click="changeRouter(item, idx, true)"
              >
                <i
                  style="font-size: 24px; margin-right: 8px"
                  v-if="item.menuIcon.includes('el-icon')"
                  :class="item.menuIcon"
                ></i>
                <img
                  width="24"
                  v-else
                  class="object-cover"
                  :src="item.menuIcon"
                  alt=""
                />
                {{ item.entName }}
              </p>
              <ul
                class="nav-child"
                :class="{
                  show:
                    showIdx == idx ||
                    (item.childList || []).some((v) => v.url == $route.path),
                }"
                v-if="item.childList && item.childList.length"
              >
                <li
                  class="nav align-center cursor-pointer"
                  :class="{ active: $route.path == doc.url }"
                  @click="changeRouter(doc, index)"
                  v-for="(doc, index) in item.childList"
                  :key="index"
                >
                  {{ doc.entName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-btm">
      <ul
        class="align-center align-center justify-between flex-1 over-hidden"
        v-popover:popover
      >
        <li class="app-ellipsis">你好，{{ user.loginUsername }}</li>
        <li>
          <el-button icon="el-icon-more" circle></el-button>
          <el-popover
            width="115"
            ref="popover"
            popper-class="users-popover"
            trigger="hover"
          >
            <p
              class="set-enter align-center cursor-pointer"
              @click="$refs.UsersView.show(user)"
            >
              <img
                style="margin-right: 5px"
                :src="require('@/assets/img/login/set.png')"
              />
              基本资料
            </p>
            <p
              @click="$refs.ChangePassword.show()"
              class="login-out align-center cursor-pointer"
            >
              <i class="el-icon-s-goods"></i>
              修改密码
            </p>
            <p class="login-out align-center cursor-pointer" @click="loginOut">
              <img
                style="margin-right: 5px"
                :src="require('@/assets/img/login/out.png')"
              />退出
            </p>
          </el-popover>
        </li>
      </ul>
    </div>
    <UsersView :body="true" ref="UsersView" />
    <ChangePassword ref="ChangePassword" />
  </div>
</template>

<script>
import routesIndex from "@/router/routesIndex";
import UsersView from "@/views/system/components/UsersView.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      routesIndex,
      showIdx: null,
    };
  },
  name: "AppSlide",
  components: { UsersView },
  props: {
    slideStyle: {
      type: Object,
      default: () => {
        //width: "280px"
        return {};
      },
    },
  },
  computed: {
    ...mapState("user", ["user", "menuTree"]),
    routesIndexData() {
      // const dataRoutes = [];
      // this.routesIndex.forEach((v) => {
      //   if (!v.hidden) {
      //     dataRoutes.push({
      //       ...v,
      //       children: (v.children || []).filter((v) => !v.hidden),
      //     });
      //   }
      // });
      // return dataRoutes;
      return this.menuTree;
    },
    currentRoute() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapActions("user", ["getUserPermission", "getPermissionTree"]),
    changeRouter(item, idx, show = false) {
      if (show) {
        if (this.showIdx == idx) {
          this.showIdx = null;
        } else {
          this.showIdx = idx;
        }
      }

      if (!item.url || this.$route.path === item.url) return;
      this.$router.push(item.url);
    },
    loginOut() {
      this.$store.commit("user/loginOut");
      this.$router.push({ name: "loginSignIn" });
    },
  },
  created() {
    Promise.all([this.getUserPermission(), this.getPermissionTree()]);
  },
};
</script>
<style scoped lang="less">
.app-slide {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #171f2a;
  .nav-box {
    padding: 0 28px;
    & > div {
      margin-bottom: 16px;
    }
  }
  .logo-box {
    height: 120px;
    min-height: 80px;
  }
  .group {
    line-height: 1;
    &:hover {
      background-color: @primary;
    }
    background-color: #3a4350;
    img {
      margin-right: 8px;
    }
  }
  .group,
  .nav {
    height: 48px;
    color: #ffffff;
    padding-left: 8px;
  }
  .nav {
    margin-left: 34px;
  }
  .group.active {
    background-color: @primary;
  }
  .nav.active {
    color: @primary;
  }
  .user-btm {
    margin: 0 28px;
    height: 48px;
    border-radius: 0px 0px 0px 0px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    line-height: 1;
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
    ::v-deep [type="button"] {
      border: none;
      background: none;
      color: #fff;
      transform: rotate(90deg);
    }
  }
}
.app-slide-up {
  overflow-y: auto;
}
.nav-child {
  display: none;
}
.nav-child.show {
  display: inherit;
}
</style>
<style lang="less">
.users-popover {
  p {
    margin-bottom: 8px;
  }
  p:last-child {
    margin-bottom: 0;
  }
  i {
    font-size: 18px;
    margin-left: -2px;
    margin-right: 4px;
  }
}
</style>
