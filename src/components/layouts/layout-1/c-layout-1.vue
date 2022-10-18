<template>
  <div>
    <div class="news-editor">

        <div class="editor-area">
            <div class="editor-area__header">
                <h2 class="editor-area__title">Área de edição</h2>
                <button class=" button-default button-default--save-template" @click="saveTemplate">Salvar template</button>
            </div>

            <div class="editor-layout-1">
                <CEditorLayout1 :selectedSectionToEdit="selectedSectionToEdit" :data.sync="currentData"/>
            </div>
        </div>

        <div class="layout-area">
            <CMailLayout1 :data="currentData" :selectedSectionToEdit.sync="selectedSectionToEdit" />
        </div>
    </div>
  </div>
</template>

<script>
import CEditorLayout1 from './components/c-editor-layout-1.vue'
import CMailLayout1 from './components/c-maill-layout-1.vue'
import initialData from '../../initialData.js'

export default {
    name: 'Layout-1',
    components: { CEditorLayout1, CMailLayout1 },
    data() {
        return {
            currentData: {},
            selectedSectionToEdit: '',
        }    
    },
    beforeMount() {
        this.currentData = initialData
    },
    methods: {
        saveTemplate() {
            this.selectedSectionToEdit = ''

            const currentHtml = document.getElementById('email-layout')
            this.currentData.html = currentHtml
            const dataToSave = this.currentData

            console.log('principal', this.selectedSectionToEdit)
            

            console.log(dataToSave)
            console.log(currentHtml)

        },
    }
}
</script>

<style src="../style.scss" lang="scss" scoped></style>

