export const User = (mongoose) => {
    const schema = mongoose.Schema(
        {
            userName: String,
            email: String,
            password: String,
            fullName: String,
            address: String,
            country: String,
            province: String,
            regency: String,
            subDistrict: String,
            village: String,
            profilePic: String,
            phoneNumber: String,
            browser: String,
            version: String,
            os: String,
            platform: String,
            userRole: String,
            refreshToken: String,
            accessToken: String
        },
        {
            timestamps: true
        }
    );

    schema.virtual('id').get(function () {
        return this._id.toHexString();
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) { 
            // ret.id = ret._id;
            delete ret._id;
        }
    });

    const UserCredentials = mongoose.model("user", schema);
    return UserCredentials;
};