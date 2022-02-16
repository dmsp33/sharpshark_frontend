/**
 * Laravel Generator APIs
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface Disputa { 
    /**
     * id
     */
    id?: number;
    /**
     * user_id
     */
    user_id?: number;
    /**
     * claim_for
     */
    claim_for?: string;
    /**
     * jurisdiction
     */
    jurisdiction?: string;
    /**
     * discovered
     */
    discovered?: string;
    /**
     * screenshot
     */
    screenshot?: string;
    /**
     * remove-content
     */
    remove_content?: boolean;
    /**
     * acknowledge
     */
    acknowledge?: boolean;
    /**
     * pay-for-use
     */
    pay_for_use?: boolean;
    /**
     * amount
     */
    amount?: string;
    /**
     * money-type
     */
    money_type?: string;
    /**
     * conditions-default
     */
    conditions_default?: boolean;
    /**
     * certificate_authorship
     */
    certificate_authorship?: string;
    /**
     * screenshot_draft
     */
    screenshot_draft?: string;
    /**
     * created_at
     */
    created_at?: string;
    /**
     * updated_at
     */
    updated_at?: string;
    /**
     * deleted_at
     */
    deleted_at?: string;
}
