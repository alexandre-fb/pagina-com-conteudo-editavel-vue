<template>
    <div>
        <div class="colors-section"
            @mouseover="handleColorsInteraction" 
            @mouseleave="handleColorsInteraction"    
        >
            <span class="colors__title">Cores:</span>
            <div class="color" :style="{ backgroundColor: data.primaryColor }"></div>  
            <div class="color" :style="{ backgroundColor: data.secondaryColor }"></div>  
            <div class="color" :style="{ backgroundColor: data.tertiaryColor }"></div>  
            <transition name="fade">
                <div class="edit-box edit-box--colors" @click="handleColorsInteraction" v-if="showEditColorsButton || selectedSectionToEdit === 'colors'">
                    <i class="edit-icon">
                        <EditIcon />
                    </i>
                </div>
            </transition> 
        </div>

        <div>
            <table id="email-layout" 
                   class="email-layout"   
                   border="0" 
                   align="center" 
                   cellpadding="0" 
                   cellspacing="0" 
                   width="100%" 
                   style="font-family: helvetica; 
                          max-width: 600px;"
            >
                <tr>
                    <td>
                        <table border="0" 
                               align="center" 
                               cellpadding="0" 
                               cellspacing="0">
                            <tr>
                                <td>
                                    <tr class="logo-section" 
                                        :style="{ 
                                            backgroundColor: data.primaryColor 
                                        }"
                                    >
                                        <td align="center" 
                                            style="padding: 20px; 
                                                   text-align: center;"
                                        >
                                            <img :src="data.logoImageUrl" alt="Logo Atlas">
                                        </td>
                                    </tr>

                                    <tr class="banner-section" 
                                        @mouseover="handleBannerSectionInteraction" 
                                        @mouseleave="handleBannerSectionInteraction"
                                    >
                                        <td>
                                            <img :src="data.bannerSection.image.url" 
                                                :alt="data.bannerSection.image.alt" 
                                                style="width: 100%; 
                                                        object-fit: cover; 
                                                        display: block;
                                                        maxHeight: 400px;"
                                            >
                                        </td>
                                        <transition name="fade">
                                            <div class="edit-box" 
                                                @click="handleBannerSectionInteraction" 
                                                v-if="showEditBannerSectionButton || selectedSectionToEdit === 'bannerSection'"
                                            >
                                                <i class="edit-icon">
                                                    <EditIcon />
                                                </i>
                                            </div>
                                        </transition>
                                    </tr>

                                    <tr class="description-section"
                                        @mouseover="handleDescriptionSectionInteraction" 
                                        @mouseleave="handleDescriptionSectionInteraction"
                                        :style="{
                                            backgroundColor: data.tertiaryColor,
                                            position: 'relative',
                                            textAlign: 'center'
                                        }"
                                    >
                                        <td style="text-align: center; 
                                                padding: 20px;"
                                        >
                                            <h2 class="section__title" 
                                                :style="{
                                                    color: data.secondaryColor, 
                                                    padding: '20px',
                                                    fontSize: '30px', 
                                                    fontStyle: 'italic',
                                                    textAlign: 'center',
                                                    margin: '0',
                                                    fontWeight: '600',
                                                }"
                                            >
                                                {{ data.descriptionSection.title }}
                                            </h2>
                                            <p class="section__paragraph"
                                            style="color: #000; 
                                                    font-size: 17px; 
                                                    font-weight: 500;
                                                    text-align: center;
                                                    margin: 0;
                                                    padding-bottom: 20px;" 
                                            >
                                                {{ data.descriptionSection.paragraph }}
                                            </p>
                                            <a :href="data.descriptionSection.button.link" target="_blank">
                                                <button class="button" 
                                                        :style="{
                                                            backgroundColor: data.secondaryColor,
                                                            color: '#fff',
                                                            padding: '10px 20px',
                                                            border: 'none',
                                                            borderRadius: '50px',
                                                            fontSize: '20px',
                                                            fontStyle: 'italic',
                                                            fontWeight: '600',
                                                            textAlign: 'center',
                                                            marginBottom: '20px'
                                                        }">
                                                    {{ data.descriptionSection.button.text }}
                                                </button>
                                            </a>
                                        </td>
                                        <transition name="fade">
                                            <div class="edit-box" 
                                                @click="handleDescriptionSectionInteraction" 
                                                v-if="showEditDescriptionSectionButton || selectedSectionToEdit === 'descriptionSection'"
                                            >
                                                    <i class="edit-icon">
                                                        <EditIcon />
                                                    </i>
                                            </div>
                                        </transition>
                                    </tr>
                                    <tr class="products-list-section" 
                                        @mouseover="handleProductsListSectionInteraction" 
                                        @mouseleave="handleProductsListSectionInteraction"
                                    >
                                        <td style="padding: 0;
                                                background-color: #fff;"
                                        >
                                            <tr class="products-list-section__title">
                                                <td>
                                                    <h2 :style="{
                                                            color: data.secondaryColor, 
                                                            padding: '20px',
                                                            fontSize: '28px',
                                                            fontWeight: '600', 
                                                            fontStyle: 'italic',
                                                            textAlign: 'center',
                                                            margin: '0',
                                                        }"
                                                    >
                                                        {{ data.productsListSection.title }}
                                                    </h2>
                                                </td>
                                            </tr> 
                                            <tr>
                                                <table style="border-spacing: 0 20px;">
                                                    <tr class="products-list-section__product-item" 
                                                        v-for="product in data.productsListSection.productsList" :key="product.id"
                                                    >
                                                        <td v-if="product.id % 2 !== 0"
                                                            class="product-item__image" 
                                                            style="width: 50%;
                                                                padding: 10px 10px 30px 10px;
                                                                border-bottom: 1px solid lightgrey;"    
                                                        >
                                                            <img :src="product.image.url" 
                                                                :alt="product.image.alt"
                                                                style="width: 100%;
                                                                        object-fit: cover;
                                                                        display: block;
                                                                        border-radius: 5px;"
                                                            >
                                                        </td>
                                                        <td class="product-item__data" 
                                                            width="50%"                                                          
                                                            :style="{
                                                                textAlign: product.id % 2 !== 0 ? 'left' : 'right', 
                                                                padding: '10px 10px 30px 10px',
                                                                borderBottom: '1px solid lightgrey'
                                                            }"
                                                        > 
                                                            <div>
                                                                <h3 class="product-item__name" 
                                                                    :style="{
                                                                        color: data.primaryColor,
                                                                        fontWeight: '600',
                                                                        textTransform: 'uppercase',
                                                                        fontSize: '18px',
                                                                        margin: '0 0 7px 0', 
                                                                        padding: '0',
                                                                        backgroundColor: '#fff',
                                                                        width: '100%'
                                                                    }">
                                                                    {{ product.productData.name }}
                                                                </h3>
                                                                <h4 class="product-item__code" 
                                                                    :style="{
                                                                        color: data.primaryColor,
                                                                        fontWeight: '600',
                                                                        textTransform: 'uppercase',
                                                                        fontSize: '16px',
                                                                        margin: '0 0 10px 0',
                                                                    }">
                                                                    {{product.productData.code}}
                                                                </h4>
                                                            </div>
                                                            <p class="product-item__decription" 
                                                            style="color: #333;
                                                                    fontSize: 14px;"
                                                            >
                                                                {{product.productData.description}}
                                                            </p>
                                                            <a class="product-item__link" 
                                                                :href="product.productData.link.url"
                                                                target="_blank"
                                                                :style="{
                                                                    color: data.secondaryColor,
                                                                    textDecoration: 'none',
                                                                    textTransform: 'uppercase',
                                                                    fontWeight: '600',
                                                                    fontSize: '18px',
                                                                }"
                                                            >
                                                                {{product.productData.link.text}}
                                                            </a>
                                                        </td>
                                                        <td v-if="product.id % 2 === 0"
                                                            class="product-item__image" 
                                                            style="width: 50%;
                                                                padding: 10px 10px 30px 10px;
                                                                border-bottom: 1px solid lightgrey;"    
                                                        >
                                                            <img :src="product.image.url" 
                                                                :alt="product.image.alt"
                                                                style="width: 100%;
                                                                        object-fit: cover;
                                                                        display: block;
                                                                        border-radius: 5px;"
                                                            >
                                                        </td>
                                                    </tr>
                                                </table>
                                            </tr>
                                            <transition name="fade">
                                                <div class="edit-box" 
                                                    @click="handleProductsListSectionInteraction" 
                                                    v-if="showEditProductsListSectionButton || selectedSectionToEdit === 'productsListSection'"
                                                >
                                                    <i class="edit-icon">
                                                        <EditIcon />
                                                    </i>
                                                </div>
                                            </transition>
                                        </td>
                                    </tr>

                                    <tr class="footer-section"
                                        :style="{
                                            backgroundColor: data.primaryColor,
                                            width: '100%',
                                            maxWidth: '600px',
                                            color: '#fff',
                                        }"
                                    >
                                        <td>
                                            <table width="100%">           
                                                <tr style="font-size: 14px;">
                                                    <td width="70%"
                                                        style="padding: 20px 10px;
                                                               min-width: 125px;"
                                                    >
                                                        <div class="social-links">
                                                            <a v-for="socialLink in socialLinks" :key="socialLink.index" href="https://pt-br.facebook.com/pinceisatlasoficial/" target="_blank">
                                                                <img :src="socialLink.imageUrl" 
                                                                     :alt="socialLink.alt"
                                                                     style="height: 25px; 
                                                                            width: 25px;
                                                                            margin-right: 10px;"
                                                                >
                                                            </a>

                                                            <span style="vertical-align: super;">
                                                                /picenisatlasoficial | 
                                                                <a href="https://www.pinceisatlas.com.br" 
                                                                   target="_blank" 
                                                                   style="color: #fff; 
                                                                          text-decoration: none;"
                                                                >
                                                                    www.pinceisatlas.com.br
                                                                </a>
                                                            </span>
                                                        </div> 
                                                    </td>               
                                                    <td width="30%" align="right">
                                                        <img :src="data.logoImageUrl" alt="Logo Atlas" style="object-fit: contain; width: 130px;">
                                                    </td>
                                                </tr>
                                                                
                                            </table>
                                        </td>
                                    </tr>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import EditIcon from '../../../icons/edit-icon.vue'

export default {
    name: 'CLayout1',
    components: { EditIcon },
    props: { 
        data: Object,
        selectedSectionToEdit: String,
    },
    data() {
        return {
            selectedSection: this.selectedSectionToEdit,
            showEditColorsButton: false,
            showEditBannerSectionButton: false,
            showEditDescriptionSectionButton: false,
            showEditProductsListSectionButton: false,
            socialLinks: [
                {
                    imageUrl: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/icons/icon-facebook.png?raw=true',
                    alt:'Ícone do Facebook',
                    link: 'https://pt-br.facebook.com/pinceisatlasoficial/'
                },
                {
                    imageUrl: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/icons/icon-instagram.png?raw=true',
                    alt:'Ícone do Instagram',
                    link: 'https://pt-br.facebook.com/pinceisatlasoficial/'
                },
                {
                    imageUrl: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/icons/icon%20youtube.png?raw=true',
                    alt:'Ícone do Youtube',
                    link: 'https://pt-br.facebook.com/pinceisatlasoficial/',
                },
            ]
        }
    },
    watch: {
            selectedSection() {
                this.emitSelectedSection()
            }
        },
    methods: {
        emitSelectedSection() {
            this.$emit('update:selectedSectionToEdit', this.selectedSection)
        },
        handleColorsInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditColorsButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditColorsButton = false
            } else if (event.type === 'click') {
                this.selectedSection = 'colors'
            }            
        },
        handleBannerSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditBannerSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditBannerSectionButton = false
            } else if (event.type === 'click') {
                this.selectedSection = 'bannerSection' 
            }            
        },
        handleDescriptionSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditDescriptionSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditDescriptionSectionButton = false
            } else if (event.type === 'click') {
                this.selectedSection = 'descriptionSection'
            }            
        },
        handleProductsListSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditProductsListSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditProductsListSectionButton = false
            } else if (event.type === 'click') {
                this.selectedSection = 'productsListSection'
            }            
        },
    }
}
</script>

<style src="../../style.scss" lang="scss" scoped></style>