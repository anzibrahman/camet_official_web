import HeroBanner from '../models/HeroBanner.js'

export const getHeroBanner = async (req, res) => {
  try {
    const hero = await HeroBanner.findOne({ page: 'home', isActive: true })

    if (!hero) {
      return res.status(200).json({
        success: true,
        hero: null,
      })
    }

    return res.status(200).json({ success: true, hero })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const createOrUpdateHeroBanner = async (req, res) => {
  try {
    const {
      badgeText,
      titleLine1,
      titleLine2,
      titleHighlight,
      subtitle,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      bannerImageUrl,
      bannerImagePublicId,
    } = req.body

    const existingHero = await HeroBanner.findOne({ page: 'home' })

    const finalBannerImageUrl =
      bannerImageUrl || existingHero?.bannerImageUrl || ''

    const finalBannerImagePublicId =
      bannerImagePublicId || existingHero?.bannerImagePublicId || ''

    if (!finalBannerImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Banner image is required',
      })
    }
console.log('finalBannerImageUrl:', finalBannerImageUrl)
    const payload = {
      page: 'home',
      badgeText,
      titleLine1,
      titleLine2,
      titleHighlight,
      subtitle,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      bannerImageUrl: finalBannerImageUrl,
      bannerImagePublicId: finalBannerImagePublicId,
      isActive: true,
    }

    const hero = await HeroBanner.findOneAndUpdate(
      { page: 'home' },
      payload,
      { new: true, upsert: true, runValidators: true }
    )

    return res.status(200).json({
      success: true,
      message: 'Hero banner saved successfully',
      hero,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}