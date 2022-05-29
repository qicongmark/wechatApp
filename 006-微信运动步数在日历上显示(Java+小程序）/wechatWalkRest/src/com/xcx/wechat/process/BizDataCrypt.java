package com.xcx.wechat.process;

import java.security.AlgorithmParameters;
import java.security.Security;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.util.Base64;

/**
 * bcprov-jdk16-1.46.jar
 * fastjson.1.2.6.jar 
 */

public class BizDataCrypt {
	
	/**
	 * 分享群的标识
	 */
	public static String getOpenGId(String encryptedData,String sessionkey, String iv){
		JSONObject jsObj = decrypt(encryptedData, sessionkey, iv);
		return jsObj.getString("openGId");
	}
	
	public static JSONObject decrypt(String encryptedData,String sessionkey, String iv){
		// 被加密的数据
        byte[] dataByte = Base64.decodeFast(encryptedData);
        // 加密秘钥
        byte[] keyByte = Base64.decodeFast(sessionkey);
        // 偏移量
        byte[] ivByte = Base64.decodeFast(iv);
        
        try {
            // 如果密钥不足16位，那么就补足.  这个if 中的内容很重要
            int base = 16;
            if (keyByte.length % base != 0) {
                int groups = keyByte.length / base + (keyByte.length % base != 0 ? 1 : 0);
                byte[] temp = new byte[groups * base];
                Arrays.fill(temp, (byte) 0);
                System.arraycopy(keyByte, 0, temp, 0, keyByte.length);
                keyByte = temp;
            }
            // 初始化
            Security.addProvider(new BouncyCastleProvider());
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding","BC");
            SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
            AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
            parameters.init(new IvParameterSpec(ivByte));
            cipher.init(Cipher.DECRYPT_MODE, spec, parameters);// 初始化
            byte[] resultByte = cipher.doFinal(dataByte);
            if (null != resultByte && resultByte.length > 0) {
                String result = new String(resultByte, "UTF-8");
                return JSONObject.parseObject(result);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        return null;
	}
	
	public static void main(String[] args){
		String encryptedData = "cVR8ymrKczHq8AsFB0aEzFGpC97GGDkSqSD4FGd6aHei+rsOWxbFbVHmevJWChA7IuetyIBHIJfDeqiwYDeJJA4722tvnTnlQpROYV81On1FQa0KNz4/7yfKS6nwvC1c0ii9k6127pVxsMnQMxgUtA==";
		String sessionkey = "XAMPXVDdZkBr5YPGFUpvxQ==";
		String iv = "6NtAtkCHrbI6wrAn3QQ5Zg==";
		System.out.println(BizDataCrypt.decrypt(encryptedData, sessionkey, iv));
	}
	
}
