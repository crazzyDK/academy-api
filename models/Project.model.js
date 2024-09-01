import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true,
    default: "https://www.bing.com/images/search?view=detailV2&ccid=eCrcK2Bi&id=8BBE3A54A26BEDFFE61006D334E8203E0343F7B0&thid=OIP.eCrcK2BiqwBGE1naWwK3UwHaHa&mediaurl=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FProfile-PNG-File.png&exph=673&expw=673&q=profile+image+png&simid=607996898424263433&FORM=IRPRST&ck=569FB476D066C1FB196C59F7C4A67893&selectedIndex=7&itb=1&cw=1375&ch=666&ajaxhist=0&ajaxserp=0"
  },
  code: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
})

const Project = mongoose.model("project", projectSchema);
export default Project;