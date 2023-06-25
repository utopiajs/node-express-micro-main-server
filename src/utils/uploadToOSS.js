const qiniu = require('qiniu');
const fs = require('fs');
const { AVATAR_OSS_SPACE, AVATAR_OSS_SPACE_DOMAIN } = require('../constants/oss');
const config = require('../config/config');

const { accessKey, secretKey } = config.oss;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
const options = {
  scope: AVATAR_OSS_SPACE,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"name":"$(fname)"}',
  expires: 7200
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const ossConfig = new qiniu.conf.Config();
// 空间对应的机房
ossConfig.zone = qiniu.zone.Zone_as0;

const uploadToOSS = ({ key, localFile }) => {
  const formUploader = new qiniu.form_up.FormUploader(ossConfig);
  const putExtra = new qiniu.form_up.PutExtra();

  return new Promise((reslove, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        reject(respErr, respBody);
      }
      // 删除临时文件
      fs.unlink(localFile, (err) => {
        if (err) {
          console.error(err);
        }
      });
      if (respInfo.statusCode === 200) {
        reslove({
          url: `http://${AVATAR_OSS_SPACE_DOMAIN}/${respBody.key}`,
          size: respBody.fsize
        });
      } else {
        reject(respBody);
      }
    });
  });
};

module.exports = uploadToOSS;
