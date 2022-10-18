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
                                                    <a href="https://pt-br.facebook.com/pinceisatlasoficial/" target="_blank">
                                                        <i :style="{
                                                                height: '20px', 
                                                                width: '20px', 
                                                                border: '1px solid #fff', 
                                                                borderRadius: '100%', 
                                                                display: 'flex', 
                                                                justifyContent: 'center', 
                                                                aligItems: 'center',
                                                                padding: '4px'
                                                            }">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                                                        </i>
                                                    </a>
                                                    <a href="https://www.instagram.com/pinceisatlasoficial/" target="_blank">
                                                        <i :style="{
                                                                height: '20px', 
                                                                width: '20px', 
                                                                border: '1px solid #fff', 
                                                                borderRadius: '100%', 
                                                                display: 'flex', 
                                                                justifyContent: 'center', 
                                                                aligItems: 'center',
                                                                padding: '4px'
                                                            }">
                                                            <svg class="instagramIcon" viewBox="0 0 448 512">
                                                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" style="fill: #fff;"/>
                                                            </svg>
                                                        </i>
                                                    </a>
                                                    <a href="https://www.youtube.com/user/pinceisatlasoficial" target="_blank">
                                                        <i :style="{
                                                                height: '20px', 
                                                                width: '20px', 
                                                                border: '1px solid #fff', 
                                                                borderRadius: '100%', 
                                                                display: 'flex', 
                                                                justifyContent: 'center', 
                                                                aligItems: 'center',
                                                                padding: '4px'
                                                            }">
                                                            <svg class="youtubeIcon" viewBox="0 0 576 512">
                                                                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" style="fill: #fff;"/>
                                                            </svg>
                                                        </i>
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

                            <!-- <tr class="footer-section" 
                                :style="{
                                    backgroundColor: data.primaryColor,
                                    color: '#fff',
                                }">
                                <td style="
                                        display: flex; 
                                        justify-content: space-between; 
                                        align-items: center; 
                                        padding: 15px 10px;
                                        max-width: 600px;
                                        margin: 0 auto;
                                    "
                                >
                                    <tr>
                                        <td>links</td>
                                        <td>logo</td>
                                    </tr>
                                    <div class="social-links" style="display: flex; gap: 10px; align-items: center;">
                                        <a href="https://pt-br.facebook.com/pinceisatlasoficial/" target="_blank">
                                            <i :style="{
                                                    height: '20px', 
                                                    width: '20px', 
                                                    border: '1px solid #fff', 
                                                    borderRadius: '100%', 
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    aligItems: 'center',
                                                    padding: '4px'
                                                }">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                                            </i>
                                        </a>
                                        <a href="https://www.instagram.com/pinceisatlasoficial/" target="_blank">
                                            <i :style="{
                                                    height: '20px', 
                                                    width: '20px', 
                                                    border: '1px solid #fff', 
                                                    borderRadius: '100%', 
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    aligItems: 'center',
                                                    padding: '4px'
                                                }">
                                                <svg class="instagramIcon" viewBox="0 0 448 512">
                                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" style="fill: #fff;"/>
                                                </svg>
                                            </i>
                                        </a>
                                        <a href="https://www.youtube.com/user/pinceisatlasoficial" target="_blank">
                                            <i :style="{
                                                    height: '20px', 
                                                    width: '20px', 
                                                    border: '1px solid #fff', 
                                                    borderRadius: '100%', 
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    aligItems: 'center',
                                                    padding: '4px'
                                                }">
                                                <svg class="youtubeIcon" viewBox="0 0 576 512">
                                                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" style="fill: #fff;"/>
                                                </svg>
                                            </i>
                                        </a>
                                        <span>/picenisatlasoficial | <a href="https://www.pinceisatlas.com.br" target="_blank" style="color: #fff; text-decoration: none;">www.pinceisatlas.com.br</a></span>
                                    </div>  -->
                                    <!-- <img :src="data.logoImageUrl" alt="Logo Atlas" style="object-fit: contain; width: 130px;"> -->
                                <!-- </td>
                            </tr> -->
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