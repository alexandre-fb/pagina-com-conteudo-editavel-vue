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

        <div >
            <table class="email-layout" id="email-layout"  border="0" align="center" cellpadding="0" cellspacing="0" width="100%" style="font-family: helvetica">
                <tr>
                    <td>
                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                            <tr class="logo-section" 
                                :style="{ backgroundColor: data.primaryColor }">
                                <td align="center" 
                                    style="padding: 20px; 
                                    text-align: center;">
                                    <img :src="data.logoImageUrl" alt="Logo Atlas">
                                </td>
                            </tr>

                            <tr class="banner-section" 
                                @mouseover="handleBannerSectionInteraction" 
                                @mouseleave="handleBannerSectionInteraction"
                            >
                                <td align="center">
                                    <img :src="data.bannerSection.image.url" 
                                        :alt="data.bannerSection.image.alt" 
                                        :style="{ 
                                            width: '100%', 
                                            objectFit: 'cover', 
                                            display: 'block',
                                            maxHeight: '400px', 
                                        }"
                                    >
                                </td>
                                <transition name="fade">
                                    <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || selectedSectionToEdit === 'bannerSection'">
                                        <i class="edit-icon">
                                            <EditIcon />
                                        </i>
                                    </div>
                                </transition>
                            </tr>

                            <tr class="description-section"
                                :style="{
                                    backgroundColor: data.tertiaryColor,
                                    position: 'relative',
                                    textAlign: 'center'
                                }"
                                @mouseover="handleDescriptionSectionInteraction" 
                                @mouseleave="handleDescriptionSectionInteraction"
                            >
                                <td style="text-align: center; 
                                        padding: 20px;"
                                >
                                    <h2 class="section__title" 
                                        :style="{
                                            padding: '20px',
                                            color: data.secondaryColor, 
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
                                    :style="{
                                            color: '#000', 
                                            fontSize: '17px', 
                                            fontWeight: '500',
                                            textAlign: 'center',
                                            margin: '0',
                                            paddingBottom: '20px',
                                        }" 
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
                                    <div class="edit-box" @click="handleDescriptionSectionInteraction" v-if="showEditDescriptionSectionButton || selectedSectionToEdit === 'descriptionSection'">
                                        <i class="edit-icon">
                                            <EditIcon />
                                        </i>
                                    </div>
                                </transition>
                            </tr>
                            <tr @mouseover="handleProductsListSectionInteraction" @mouseleave="handleProductsListSectionInteraction">
                                <td style="padding: 0;
                                        background-color: #fff;">
                                    <table class="products-list-section">
                                        <tr class="products-list-section__title">
                                            <h2 :style="{
                                                    padding: '20px',
                                                    color: data.secondaryColor, 
                                                    fontSize: '28px',
                                                    fontWeight: '600', 
                                                    fontStyle: 'italic',
                                                    textAlign: 'center',
                                                    margin: '0',
                                                }">
                                                {{ data.productsListSection.title }}
                                            </h2>
                                        </tr> 
                                        <tr>
                                            <table style="border-spacing: 0 20px;">
                                                <tr class="products-list-section__product-item"
                                                    v-for="product in data.productsListSection.productsList" :key="product.id"
                                                    :style="{
                                                        
                                                        border: '1px solid red',
                                                    }"
                                                >
                                                    <td class="product-item__image" 
                                                        width="50%"
                                                        border-bottom:
                                                        v-if="product.id % 2 !== 0"
                                                        :style="{
                                                            width: '50%',
                                                            padding: '10px',
                                                        }"    
                                                    >
                                                        <img class="product-item__image" 
                                                            :src="product.image.url" 
                                                            :alt="product.image.alt"
                                                            :style="{
                                                                width: '100%',
                                                                objectFit: 'cover',
                                                                display: 'block',
                                                                borderRadius: '5px',
                                                            }"
                                                        >
                                                    </td>
                                                    <td class="product-item__data" 
                                                        width="50%"                                                          
                                                        :style="{
                                                            textAlign: product.id % 2 !== 0 ? 'left' : 'right',
                                                            
                                                            padding: '10px',
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
                                                                    color: '#27283f',
                                                                    fontWeight: '600',
                                                                    textTransform: 'uppercase',
                                                                    fontSize: '16px',
                                                                    margin: '0 0 10px 0',
                                                                }">
                                                                {{product.productData.code}}
                                                            </h4>
                                                        </div>
                                                        <p class="product-item__decription" 
                                                        :style="{
                                                                color: '#333',
                                                                fontSize: '14px',
                                                            }"
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
                                                    <td class="product-item__image" 
                                                        width="50%" 
                                                        v-if="product.id % 2 === 0"
                                                        :style="{
                                                            maxWidth: '266px',
                                                            
                                                            padding: '10px',
                                                        }"    
                                                    >
                                                        <img class="product-item__image" 
                                                            :src="product.image.url" 
                                                            :alt="product.image.alt"
                                                            :style="{
                                                                width: '100%',
                                                                objectFit: 'cover',
                                                                display: 'block',
                                                                borderRadius: '5px',
                                                            }"
                                                        >
                                                    </td>
                                                </tr>
                                            </table>
                                        </tr>
                                    </table> 
                                    <transition name="fade">
                                        <div class="edit-box" @click="handleProductsListSectionInteraction" 
                                        v-if="showEditProductsListSectionButton || selectedSectionToEdit === 'productsListSection'">
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
                                    color: '#fff',
                                }"
                            >
                                <td>
                                    <table width="100%">
                                        <tr style="font-size: 14px;">
                                            <td width="70%" style="padding: 20px 10px">
                                                <div class="social-links" style="display: flex; gap: 10px; align-items: center;">
                                                    <a :style="{
                                                                height: '20px', 
                                                                width: '20px', 
                                                                border: '1px solid #fff', 
                                                                borderRadius: '100%', 
                                                                display: 'flex', 
                                                                justifyContent: 'center', 
                                                                aligItems: 'center',
                                                                padding: socialLink.name === 'youtube' ? '5px' : '4px'
                                                            }"  v-for="socialLink in socialLinks" :key="socialLink.index" href="https://pt-br.facebook.com/pinceisatlasoficial/" target="_blank">
                                                        <img 
                                                            :src="socialLink.imageUrl" 
                                                            :alt="socialLink.alt">
                                                    </a>
                                                    <span>/picenisatlasoficial | <a href="https://www.pinceisatlas.com.br" target="_blank" style="color: #fff; text-decoration: none;">www.pinceisatlas.com.br</a></span>
                                                </div> 
                                            </td>
                                            <td width="30%" align="right">
                                                <img :src="data.logoImageUrl" alt="Logo Atlas" style="object-fit: contain; width: 130px;">
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <button @click="handleClick">Click</button>
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
                    imageUrl: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/icons/facebook-icon.png?raw=true',
                    alt:'Ícone do Facebook',
                    link: 'https://pt-br.facebook.com/pinceisatlasoficial/'
                },
                {
                    imageUrl: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/icons/instagram-icon.png?raw=true',
                    alt:'Ícone do Instagram',
                    link: 'https://pt-br.facebook.com/pinceisatlasoficial/'
                },
                {
                    imageUrl: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/icons/youtube-icon.png?raw=true',
                    alt:'Ícone do Youtube',
                    link: 'https://pt-br.facebook.com/pinceisatlasoficial/',
                    name: 'youtube'
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
        handleClick() {
            console.log(this.selectedSection)
            
            console.log('this.selectedSectionToEdit', this.selectedSectionToEdit)

        },
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