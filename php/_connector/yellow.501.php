<?php

/*
 * API Token 및 secure key 관련 설명 추가
 */

class HFConnector
{
	private $resCURL;
	private $arrHeader = [];
	private $arrRequestData = [];
	private $strAPIToken;
	private $strSecureKey = "ee9d2d324e261c42e5372a20b19c85b5ac7db7908dce804c59c911c2ae6624e1"; // Demo용 Key 입니다.
	public $result;
	public $response;
	public function __construct($arrRequestData)
	{
		$boolResult = setcookie("secure_key", $this->strSecureKey, [
			'expires' => time() + (60 * 60 * 24 * 365),
			'path' => '/',
			'secure' => true,
			'samesite' => 'None'
		]);
		$this->resCURL = curl_init("http://api.hanbnc.com/request");
		$this->arrHeader[] = 'view-id:' . $arrRequestData['dataID'];
		$this->arrHeader[] = 'api-token:' . $this->strAPIToken;
		$this->arrHeader[] = 'security-key:' . $this->strSecureKey;
		$arrRequestData['session_id'] = $_COOKIE['session_id'];
		$arrRequestData['api_token'] = $_COOKIE['api_token'];
		$arrRequestData['secure_key'] = $this->strSecureKey;
		$this->arrRequestData = array_merge($arrRequestData, $_REQUEST ? $_REQUEST : array());
	}

	public function request()
	{

		curl_setopt($this->resCURL, CURLOPT_HEADER, false);
		curl_setopt($this->resCURL, CURLOPT_HTTPHEADER, $this->arrHeader);
		curl_setopt($this->resCURL, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($this->resCURL, CURLOPT_POST, 1);
		curl_setopt($this->resCURL, CURLOPT_POSTFIELDS, $this->arrRequestData);
		curl_setopt($this->resCURL, CURLOPT_USERAGENT, $agent);
		curl_setopt($this->resCURL, CURLOPT_REFERER, "");
		curl_setopt($this->resCURL, CURLOPT_TIMEOUT, 50);
		curl_setopt($this->resCURL, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($this->resCURL, CURLOPT_SSL_VERIFYHOST, false);
		$this->result = $strResult = curl_exec($this->resCURL);
		$this->response = $arrResponse = curl_getinfo($this->resCURL);
		if (curl_errno($this->resCURL)) {
			echo(curl_errno($this->resCURL) . ' || ' . curl_error($this->resCURL));
		}

		curl_close($this->resCURL);
		if (is_array($arrResponse) && $arrResponse['http_code'] == 200) {
			$arrReturn = json_decode($strResult, true);
			if($arrReturn['redirect_url']){
				header('location:'.$arrReturn['redirect_url']);
				exit;
			}
			$boolResult = setcookie("session_id", $arrReturn['session']['id'], [
				'expires' => time() + (60 * 60 * 24 * 365),
				'path' => '/',
				'secure' => true,
				'samesite' => 'None'
			]);
			$boolResult = setcookie("api_token", $arrReturn['session']['api_token'], [
				'expires' => time() + (60 * 60 * 24 * 365),
				'path' => '/',
				'secure' => true,
				'samesite' => 'None'
			]);
		} else {
			$arrReturn = $arrResponse;
		}

		return ($arrReturn);
	}
}
$oHFConnector = new HFConnector($arrRequestData);
$output = $oHFConnector->request();
