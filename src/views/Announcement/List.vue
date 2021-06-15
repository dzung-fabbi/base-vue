<template>
  <div>list
    <router-link :to="{ name:'AnnouncementDetail', params: { id: 1 } }">
      <button class="btn">
        <EyeIcon/>
      </button>
    </router-link>
  </div>
</template>
<script>
import EyeIcon from "@/components/Icon/EyeIcon";
export default {
  components: {EyeIcon}
}
</script>
