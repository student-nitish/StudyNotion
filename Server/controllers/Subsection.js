const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create SubSection

exports.createSubSection = async (req, res) => {
    try{
            //fecth data from Req body
            const {sectionId, title, timeDuration, description} = req.body;
            console.log("timeduration",timeDuration);
            //extract file/video
            const video  = req.files.video;
            console.log("video",video);
            //validation
            if(!sectionId || !title || !timeDuration || !description || !video) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required',
                });
            }
            //upload video to cloudinary
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            //create a sub-section
            const subSectionDetails = await SubSection.create({
                title:title,
                timeDuration:timeDuration,
                description:description,
                videoUrl:uploadDetails.secure_url,
            })
            //update section with this sub section ObjectId
            const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                        {$push:{
                                                            subSection:subSectionDetails._id,
                                                        }},
                                                        {new:true});
            //HW: log updated section here, after adding populate query
            //return response
            return res.status(200).json({
                success:true,
                message:'Sub Section Created Successfully',
                updatedSection,
            });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
};

//HW: updateSubSection
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId,subSectionId, title, timeDuration, description } = req.body;
        const video = req.files?.videoFile;

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'subSectionId is required',
            });
        }

        // Find existing sub-section
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: 'Sub Section not found',
            });
        }

        // If video is provided, upload and update
        if (video) {
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
        }

        // Update other fields
        if (title) subSection.title = title;
        if (timeDuration) subSection.timeDuration = timeDuration;
        if (description) subSection.description = description;

        await subSection.save();
          const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.status(200).json({
            success: true,
            message: 'Sub Section Updated Successfully',
            data: updatedSection,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update sub-section",
            error: error.message,
        });
    }
};


//HW:deleteSubSection

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'subSectionId and sectionId are required',
            });
        }

        // Delete subsection
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: 'Sub Section not found',
            });
        }

        // Remove reference from section
        await Section.findByIdAndUpdate(sectionId, {
            $pull: { subSection: subSectionId }
        });
        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success: true,
            message: "Sub Section Deleted Successfully",
            data:updatedSection,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete Sub Section, please try again",
            error: error.message,
        });
    }
};
