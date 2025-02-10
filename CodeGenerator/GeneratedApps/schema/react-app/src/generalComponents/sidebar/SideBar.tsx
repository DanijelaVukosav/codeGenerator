import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../authService/userService";
import "../../styles/sidebar.css";
import { APPLICATION_ROUTES } from "../../router/routes";
import { useAbility } from "../../router/casl/AbilityContext";
import { useUser } from "../../authService/UserProvider";
import ThemeToggle from "./ThemeToggle";

type SideBarLink = {
  key: string;
  path: string;
};

export const SideBar: React.FC = () => {
  const [hiddenMenu, setHiddenMenu] = React.useState(true);
  const { ability } = useAbility();
  const { user } = useUser();
  const navigate = useNavigate();

  const links: SideBarLink[] = useMemo(() => {
    const sideBarLinks: SideBarLink[] = [];
ability.can("CATALOG_PRODUCT_OPTION_TYPE_TITLE_READ", "CATALOG_PRODUCT_OPTION_TYPE_TITLE_READ") &&
sideBarLinks.push({
key: "catalog_product_option_type_title",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_TITLE,
});
ability.can("CMS_PAGE_READ", "CMS_PAGE_READ") &&
sideBarLinks.push({
key: "cms_page",
path: APPLICATION_ROUTES.CMS_PAGE,
});
ability.can("DATAFLOW_BATCH_IMPORT_READ", "DATAFLOW_BATCH_IMPORT_READ") &&
sideBarLinks.push({
key: "dataflow_batch_import",
path: APPLICATION_ROUTES.DATAFLOW_BATCH_IMPORT,
});
ability.can("CUSTOMER_ADDRESS_ENTITY_TEXT_READ", "CUSTOMER_ADDRESS_ENTITY_TEXT_READ") &&
sideBarLinks.push({
key: "customer_address_entity_text",
path: APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_TEXT,
});
ability.can("DATAFLOW_PROFILE_READ", "DATAFLOW_PROFILE_READ") &&
sideBarLinks.push({
key: "dataflow_profile",
path: APPLICATION_ROUTES.DATAFLOW_PROFILE,
});
ability.can("NEWSLETTER_QUEUE_LINK_READ", "NEWSLETTER_QUEUE_LINK_READ") &&
sideBarLinks.push({
key: "newsletter_queue_link",
path: APPLICATION_ROUTES.NEWSLETTER_QUEUE_LINK,
});
ability.can("ADMIN_ASSERT_READ", "ADMIN_ASSERT_READ") &&
sideBarLinks.push({
key: "admin_assert",
path: APPLICATION_ROUTES.ADMIN_ASSERT,
});
ability.can("CATALOGINVENTORY_STOCK_READ", "CATALOGINVENTORY_STOCK_READ") &&
sideBarLinks.push({
key: "cataloginventory_stock",
path: APPLICATION_ROUTES.CATALOGINVENTORY_STOCK,
});
ability.can("DATAFLOW_PROFILE_HISTORY_READ", "DATAFLOW_PROFILE_HISTORY_READ") &&
sideBarLinks.push({
key: "dataflow_profile_history",
path: APPLICATION_ROUTES.DATAFLOW_PROFILE_HISTORY,
});
ability.can("SALES_FLAT_QUOTE_PAYMENT_READ", "SALES_FLAT_QUOTE_PAYMENT_READ") &&
sideBarLinks.push({
key: "sales_flat_quote_payment",
path: APPLICATION_ROUTES.SALES_FLAT_QUOTE_PAYMENT,
});
ability.can("SALES_ORDER_ENTITY_INT_READ", "SALES_ORDER_ENTITY_INT_READ") &&
sideBarLinks.push({
key: "sales_order_entity_int",
path: APPLICATION_ROUTES.SALES_ORDER_ENTITY_INT,
});
ability.can("TAG_RELATION_READ", "TAG_RELATION_READ") &&
sideBarLinks.push({
key: "tag_relation",
path: APPLICATION_ROUTES.TAG_RELATION,
});
ability.can("WISHLIST_ITEM_READ", "WISHLIST_ITEM_READ") &&
sideBarLinks.push({
key: "wishlist_item",
path: APPLICATION_ROUTES.WISHLIST_ITEM,
});
ability.can("SALESRULE_CUSTOMER_READ", "SALESRULE_CUSTOMER_READ") &&
sideBarLinks.push({
key: "salesrule_customer",
path: APPLICATION_ROUTES.SALESRULE_CUSTOMER,
});
ability.can("CUSTOMER_ADDRESS_ENTITY_READ", "CUSTOMER_ADDRESS_ENTITY_READ") &&
sideBarLinks.push({
key: "customer_address_entity",
path: APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY,
});
ability.can("GOOGLECHECKOUT_API_DEBUG_READ", "GOOGLECHECKOUT_API_DEBUG_READ") &&
sideBarLinks.push({
key: "googlecheckout_api_debug",
path: APPLICATION_ROUTES.GOOGLECHECKOUT_API_DEBUG,
});
ability.can("CATALOG_PRODUCT_ENTITY_VARCHAR_READ", "CATALOG_PRODUCT_ENTITY_VARCHAR_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_varchar",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_VARCHAR,
});
ability.can("CORE_CONFIG_DATA_READ", "CORE_CONFIG_DATA_READ") &&
sideBarLinks.push({
key: "core_config_data",
path: APPLICATION_ROUTES.CORE_CONFIG_DATA,
});
ability.can("DIRECTORY_COUNTRY_REGION_READ", "DIRECTORY_COUNTRY_REGION_READ") &&
sideBarLinks.push({
key: "directory_country_region",
path: APPLICATION_ROUTES.DIRECTORY_COUNTRY_REGION,
});
ability.can("DIRECTORY_CURRENCY_RATE_READ", "DIRECTORY_CURRENCY_RATE_READ") &&
sideBarLinks.push({
key: "directory_currency_rate",
path: APPLICATION_ROUTES.DIRECTORY_CURRENCY_RATE,
});
ability.can("REVIEW_READ", "REVIEW_READ") &&
sideBarLinks.push({
key: "review",
path: APPLICATION_ROUTES.REVIEW,
});
ability.can("REVIEW_ENTITY_READ", "REVIEW_ENTITY_READ") &&
sideBarLinks.push({
key: "review_entity",
path: APPLICATION_ROUTES.REVIEW_ENTITY,
});
ability.can("LOG_SUMMARY_READ", "LOG_SUMMARY_READ") &&
sideBarLinks.push({
key: "log_summary",
path: APPLICATION_ROUTES.LOG_SUMMARY,
});
ability.can("RATING_TITLE_READ", "RATING_TITLE_READ") &&
sideBarLinks.push({
key: "rating_title",
path: APPLICATION_ROUTES.RATING_TITLE,
});
ability.can("SHIPPING_TABLERATE_READ", "SHIPPING_TABLERATE_READ") &&
sideBarLinks.push({
key: "shipping_tablerate",
path: APPLICATION_ROUTES.SHIPPING_TABLERATE,
});
ability.can("POLL_VOTE_READ", "POLL_VOTE_READ") &&
sideBarLinks.push({
key: "poll_vote",
path: APPLICATION_ROUTES.POLL_VOTE,
});
ability.can("SALESRULE_READ", "SALESRULE_READ") &&
sideBarLinks.push({
key: "salesrule",
path: APPLICATION_ROUTES.SALESRULE,
});
ability.can("CATALOG_PRODUCT_ENTITY_TEXT_READ", "CATALOG_PRODUCT_ENTITY_TEXT_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_text",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_TEXT,
});
ability.can("NEWSLETTER_PROBLEM_READ", "NEWSLETTER_PROBLEM_READ") &&
sideBarLinks.push({
key: "newsletter_problem",
path: APPLICATION_ROUTES.NEWSLETTER_PROBLEM,
});
ability.can("SALES_FLAT_QUOTE_ITEM_READ", "SALES_FLAT_QUOTE_ITEM_READ") &&
sideBarLinks.push({
key: "sales_flat_quote_item",
path: APPLICATION_ROUTES.SALES_FLAT_QUOTE_ITEM,
});
ability.can("EAV_ENTITY_INT_READ", "EAV_ENTITY_INT_READ") &&
sideBarLinks.push({
key: "eav_entity_int",
path: APPLICATION_ROUTES.EAV_ENTITY_INT,
});
ability.can("EAV_ATTRIBUTE_GROUP_READ", "EAV_ATTRIBUTE_GROUP_READ") &&
sideBarLinks.push({
key: "eav_attribute_group",
path: APPLICATION_ROUTES.EAV_ATTRIBUTE_GROUP,
});
ability.can("DATAFLOW_SESSION_READ", "DATAFLOW_SESSION_READ") &&
sideBarLinks.push({
key: "dataflow_session",
path: APPLICATION_ROUTES.DATAFLOW_SESSION,
});
ability.can("DIRECTORY_COUNTRY_FORMAT_READ", "DIRECTORY_COUNTRY_FORMAT_READ") &&
sideBarLinks.push({
key: "directory_country_format",
path: APPLICATION_ROUTES.DIRECTORY_COUNTRY_FORMAT,
});
ability.can("TAX_CALCULATION_READ", "TAX_CALCULATION_READ") &&
sideBarLinks.push({
key: "tax_calculation",
path: APPLICATION_ROUTES.TAX_CALCULATION,
});
ability.can("CORE_URL_REWRITE_READ", "CORE_URL_REWRITE_READ") &&
sideBarLinks.push({
key: "core_url_rewrite",
path: APPLICATION_ROUTES.CORE_URL_REWRITE,
});
ability.can("CATALOG_PRODUCT_SUPER_LINK_READ", "CATALOG_PRODUCT_SUPER_LINK_READ") &&
sideBarLinks.push({
key: "catalog_product_super_link",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_LINK,
});
ability.can("TAX_CALCULATION_RULE_READ", "TAX_CALCULATION_RULE_READ") &&
sideBarLinks.push({
key: "tax_calculation_rule",
path: APPLICATION_ROUTES.TAX_CALCULATION_RULE,
});
ability.can("CATALOG_PRODUCT_LINK_READ", "CATALOG_PRODUCT_LINK_READ") &&
sideBarLinks.push({
key: "catalog_product_link",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_LINK,
});
ability.can("LOG_URL_INFO_READ", "LOG_URL_INFO_READ") &&
sideBarLinks.push({
key: "log_url_info",
path: APPLICATION_ROUTES.LOG_URL_INFO,
});
ability.can("RATING_OPTION_VOTE_READ", "RATING_OPTION_VOTE_READ") &&
sideBarLinks.push({
key: "rating_option_vote",
path: APPLICATION_ROUTES.RATING_OPTION_VOTE,
});
ability.can("RATING_OPTION_VOTE_AGGREGATED_READ", "RATING_OPTION_VOTE_AGGREGATED_READ") &&
sideBarLinks.push({
key: "rating_option_vote_aggregated",
path: APPLICATION_ROUTES.RATING_OPTION_VOTE_AGGREGATED,
});
ability.can("SALES_FLAT_QUOTE_ITEM_OPTION_READ", "SALES_FLAT_QUOTE_ITEM_OPTION_READ") &&
sideBarLinks.push({
key: "sales_flat_quote_item_option",
path: APPLICATION_ROUTES.SALES_FLAT_QUOTE_ITEM_OPTION,
});
ability.can("CUSTOMER_ENTITY_READ", "CUSTOMER_ENTITY_READ") &&
sideBarLinks.push({
key: "customer_entity",
path: APPLICATION_ROUTES.CUSTOMER_ENTITY,
});
ability.can("SALES_ORDER_DATETIME_READ", "SALES_ORDER_DATETIME_READ") &&
sideBarLinks.push({
key: "sales_order_datetime",
path: APPLICATION_ROUTES.SALES_ORDER_DATETIME,
});
ability.can("REVIEW_ENTITY_SUMMARY_READ", "REVIEW_ENTITY_SUMMARY_READ") &&
sideBarLinks.push({
key: "review_entity_summary",
path: APPLICATION_ROUTES.REVIEW_ENTITY_SUMMARY,
});
ability.can("CORE_RESOURCE_READ", "CORE_RESOURCE_READ") &&
sideBarLinks.push({
key: "core_resource",
path: APPLICATION_ROUTES.CORE_RESOURCE,
});
ability.can("SALES_FLAT_QUOTE_ADDRESS_ITEM_READ", "SALES_FLAT_QUOTE_ADDRESS_ITEM_READ") &&
sideBarLinks.push({
key: "sales_flat_quote_address_item",
path: APPLICATION_ROUTES.SALES_FLAT_QUOTE_ADDRESS_ITEM,
});
ability.can("CUSTOMER_ENTITY_VARCHAR_READ", "CUSTOMER_ENTITY_VARCHAR_READ") &&
sideBarLinks.push({
key: "customer_entity_varchar",
path: APPLICATION_ROUTES.CUSTOMER_ENTITY_VARCHAR,
});
ability.can("CUSTOMER_ADDRESS_ENTITY_DATETIME_READ", "CUSTOMER_ADDRESS_ENTITY_DATETIME_READ") &&
sideBarLinks.push({
key: "customer_address_entity_datetime",
path: APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_DATETIME,
});
ability.can("SALES_ORDER_TEXT_READ", "SALES_ORDER_TEXT_READ") &&
sideBarLinks.push({
key: "sales_order_text",
path: APPLICATION_ROUTES.SALES_ORDER_TEXT,
});
ability.can("CUSTOMER_ENTITY_INT_READ", "CUSTOMER_ENTITY_INT_READ") &&
sideBarLinks.push({
key: "customer_entity_int",
path: APPLICATION_ROUTES.CUSTOMER_ENTITY_INT,
});
ability.can("CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL_READ", "CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL_READ") &&
sideBarLinks.push({
key: "catalog_product_super_attribute_label",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL,
});
ability.can("CORE_TRANSLATE_READ", "CORE_TRANSLATE_READ") &&
sideBarLinks.push({
key: "core_translate",
path: APPLICATION_ROUTES.CORE_TRANSLATE,
});
ability.can("DIRECTORY_COUNTRY_REGION_NAME_READ", "DIRECTORY_COUNTRY_REGION_NAME_READ") &&
sideBarLinks.push({
key: "directory_country_region_name",
path: APPLICATION_ROUTES.DIRECTORY_COUNTRY_REGION_NAME,
});
ability.can("TAX_CALCULATION_RATE_READ", "TAX_CALCULATION_RATE_READ") &&
sideBarLinks.push({
key: "tax_calculation_rate",
path: APPLICATION_ROUTES.TAX_CALCULATION_RATE,
});
ability.can("CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_READ", "CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_media_gallery_value",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE,
});
ability.can("CATALOG_COMPARE_ITEM_READ", "CATALOG_COMPARE_ITEM_READ") &&
sideBarLinks.push({
key: "catalog_compare_item",
path: APPLICATION_ROUTES.CATALOG_COMPARE_ITEM,
});
ability.can("CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_READ", "CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_media_gallery",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY,
});
ability.can("LOG_SUMMARY_TYPE_READ", "LOG_SUMMARY_TYPE_READ") &&
sideBarLinks.push({
key: "log_summary_type",
path: APPLICATION_ROUTES.LOG_SUMMARY_TYPE,
});
ability.can("CATALOG_CATEGORY_PRODUCT_READ", "CATALOG_CATEGORY_PRODUCT_READ") &&
sideBarLinks.push({
key: "catalog_category_product",
path: APPLICATION_ROUTES.CATALOG_CATEGORY_PRODUCT,
});
ability.can("CATALOG_PRODUCT_OPTION_READ", "CATALOG_PRODUCT_OPTION_READ") &&
sideBarLinks.push({
key: "catalog_product_option",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION,
});
ability.can("LOG_VISITOR_READ", "LOG_VISITOR_READ") &&
sideBarLinks.push({
key: "log_visitor",
path: APPLICATION_ROUTES.LOG_VISITOR,
});
ability.can("SALES_FLAT_ORDER_ITEM_READ", "SALES_FLAT_ORDER_ITEM_READ") &&
sideBarLinks.push({
key: "sales_flat_order_item",
path: APPLICATION_ROUTES.SALES_FLAT_ORDER_ITEM,
});
ability.can("CATALOGINDEX_EAV_READ", "CATALOGINDEX_EAV_READ") &&
sideBarLinks.push({
key: "catalogindex_eav",
path: APPLICATION_ROUTES.CATALOGINDEX_EAV,
});
ability.can("PAYGATE_AUTHORIZENET_DEBUG_READ", "PAYGATE_AUTHORIZENET_DEBUG_READ") &&
sideBarLinks.push({
key: "paygate_authorizenet_debug",
path: APPLICATION_ROUTES.PAYGATE_AUTHORIZENET_DEBUG,
});
ability.can("REPORT_EVENT_READ", "REPORT_EVENT_READ") &&
sideBarLinks.push({
key: "report_event",
path: APPLICATION_ROUTES.REPORT_EVENT,
});
ability.can("CATALOGSEARCH_QUERY_READ", "CATALOGSEARCH_QUERY_READ") &&
sideBarLinks.push({
key: "catalogsearch_query",
path: APPLICATION_ROUTES.CATALOGSEARCH_QUERY,
});
ability.can("LOG_CUSTOMER_READ", "LOG_CUSTOMER_READ") &&
sideBarLinks.push({
key: "log_customer",
path: APPLICATION_ROUTES.LOG_CUSTOMER,
});
ability.can("SALES_ORDER_ENTITY_TEXT_READ", "SALES_ORDER_ENTITY_TEXT_READ") &&
sideBarLinks.push({
key: "sales_order_entity_text",
path: APPLICATION_ROUTES.SALES_ORDER_ENTITY_TEXT,
});
ability.can("SALES_ORDER_VARCHAR_READ", "SALES_ORDER_VARCHAR_READ") &&
sideBarLinks.push({
key: "sales_order_varchar",
path: APPLICATION_ROUTES.SALES_ORDER_VARCHAR,
});
ability.can("CATALOG_CATEGORY_PRODUCT_INDEX_READ", "CATALOG_CATEGORY_PRODUCT_INDEX_READ") &&
sideBarLinks.push({
key: "catalog_category_product_index",
path: APPLICATION_ROUTES.CATALOG_CATEGORY_PRODUCT_INDEX,
});
ability.can("EAV_ATTRIBUTE_OPTION_VALUE_READ", "EAV_ATTRIBUTE_OPTION_VALUE_READ") &&
sideBarLinks.push({
key: "eav_attribute_option_value",
path: APPLICATION_ROUTES.EAV_ATTRIBUTE_OPTION_VALUE,
});
ability.can("REVIEW_STATUS_READ", "REVIEW_STATUS_READ") &&
sideBarLinks.push({
key: "review_status",
path: APPLICATION_ROUTES.REVIEW_STATUS,
});
ability.can("CATALOG_CATEGORY_ENTITY_VARCHAR_READ", "CATALOG_CATEGORY_ENTITY_VARCHAR_READ") &&
sideBarLinks.push({
key: "catalog_category_entity_varchar",
path: APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_VARCHAR,
});
ability.can("SALES_FLAT_QUOTE_SHIPPING_RATE_READ", "SALES_FLAT_QUOTE_SHIPPING_RATE_READ") &&
sideBarLinks.push({
key: "sales_flat_quote_shipping_rate",
path: APPLICATION_ROUTES.SALES_FLAT_QUOTE_SHIPPING_RATE,
});
ability.can("CATALOG_CATEGORY_ENTITY_READ", "CATALOG_CATEGORY_ENTITY_READ") &&
sideBarLinks.push({
key: "catalog_category_entity",
path: APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY,
});
ability.can("CMS_BLOCK_READ", "CMS_BLOCK_READ") &&
sideBarLinks.push({
key: "cms_block",
path: APPLICATION_ROUTES.CMS_BLOCK,
});
ability.can("CATALOGINVENTORY_STOCK_ITEM_READ", "CATALOGINVENTORY_STOCK_ITEM_READ") &&
sideBarLinks.push({
key: "cataloginventory_stock_item",
path: APPLICATION_ROUTES.CATALOGINVENTORY_STOCK_ITEM,
});
ability.can("ADMINNOTIFICATION_INBOX_READ", "ADMINNOTIFICATION_INBOX_READ") &&
sideBarLinks.push({
key: "adminnotification_inbox",
path: APPLICATION_ROUTES.ADMINNOTIFICATION_INBOX,
});
ability.can("CRON_SCHEDULE_READ", "CRON_SCHEDULE_READ") &&
sideBarLinks.push({
key: "cron_schedule",
path: APPLICATION_ROUTES.CRON_SCHEDULE,
});
ability.can("ADMIN_ROLE_READ", "ADMIN_ROLE_READ") &&
sideBarLinks.push({
key: "admin_role",
path: APPLICATION_ROUTES.ADMIN_ROLE,
});
ability.can("SALES_ORDER_ENTITY_READ", "SALES_ORDER_ENTITY_READ") &&
sideBarLinks.push({
key: "sales_order_entity",
path: APPLICATION_ROUTES.SALES_ORDER_ENTITY,
});
ability.can("CATALOG_CATEGORY_ENTITY_DECIMAL_READ", "CATALOG_CATEGORY_ENTITY_DECIMAL_READ") &&
sideBarLinks.push({
key: "catalog_category_entity_decimal",
path: APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_DECIMAL,
});
ability.can("PRODUCT_ALERT_PRICE_READ", "PRODUCT_ALERT_PRICE_READ") &&
sideBarLinks.push({
key: "product_alert_price",
path: APPLICATION_ROUTES.PRODUCT_ALERT_PRICE,
});
ability.can("SALES_ORDER_TAX_READ", "SALES_ORDER_TAX_READ") &&
sideBarLinks.push({
key: "sales_order_tax",
path: APPLICATION_ROUTES.SALES_ORDER_TAX,
});
ability.can("REVIEW_DETAIL_READ", "REVIEW_DETAIL_READ") &&
sideBarLinks.push({
key: "review_detail",
path: APPLICATION_ROUTES.REVIEW_DETAIL,
});
ability.can("SALES_FLAT_QUOTE_ADDRESS_READ", "SALES_FLAT_QUOTE_ADDRESS_READ") &&
sideBarLinks.push({
key: "sales_flat_quote_address",
path: APPLICATION_ROUTES.SALES_FLAT_QUOTE_ADDRESS,
});
ability.can("DATAFLOW_IMPORT_DATA_READ", "DATAFLOW_IMPORT_DATA_READ") &&
sideBarLinks.push({
key: "dataflow_import_data",
path: APPLICATION_ROUTES.DATAFLOW_IMPORT_DATA,
});
ability.can("CATALOG_PRODUCT_LINK_ATTRIBUTE_READ", "CATALOG_PRODUCT_LINK_ATTRIBUTE_READ") &&
sideBarLinks.push({
key: "catalog_product_link_attribute",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE,
});
ability.can("CATALOG_PRODUCT_OPTION_TITLE_READ", "CATALOG_PRODUCT_OPTION_TITLE_READ") &&
sideBarLinks.push({
key: "catalog_product_option_title",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TITLE,
});
ability.can("LOG_QUOTE_READ", "LOG_QUOTE_READ") &&
sideBarLinks.push({
key: "log_quote",
path: APPLICATION_ROUTES.LOG_QUOTE,
});
ability.can("CATALOG_PRODUCT_BUNDLE_OPTION_READ", "CATALOG_PRODUCT_BUNDLE_OPTION_READ") &&
sideBarLinks.push({
key: "catalog_product_bundle_option",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_OPTION,
});
ability.can("TAX_CALCULATION_RATE_TITLE_READ", "TAX_CALCULATION_RATE_TITLE_READ") &&
sideBarLinks.push({
key: "tax_calculation_rate_title",
path: APPLICATION_ROUTES.TAX_CALCULATION_RATE_TITLE,
});
ability.can("PAYPAL_API_DEBUG_READ", "PAYPAL_API_DEBUG_READ") &&
sideBarLinks.push({
key: "paypal_api_debug",
path: APPLICATION_ROUTES.PAYPAL_API_DEBUG,
});
ability.can("API_USER_READ", "API_USER_READ") &&
sideBarLinks.push({
key: "api_user",
path: APPLICATION_ROUTES.API_USER,
});
ability.can("DATAFLOW_BATCH_EXPORT_READ", "DATAFLOW_BATCH_EXPORT_READ") &&
sideBarLinks.push({
key: "dataflow_batch_export",
path: APPLICATION_ROUTES.DATAFLOW_BATCH_EXPORT,
});
ability.can("EAV_ATTRIBUTE_SET_READ", "EAV_ATTRIBUTE_SET_READ") &&
sideBarLinks.push({
key: "eav_attribute_set",
path: APPLICATION_ROUTES.EAV_ATTRIBUTE_SET,
});
ability.can("NEWSLETTER_QUEUE_STORE_LINK_READ", "NEWSLETTER_QUEUE_STORE_LINK_READ") &&
sideBarLinks.push({
key: "newsletter_queue_store_link",
path: APPLICATION_ROUTES.NEWSLETTER_QUEUE_STORE_LINK,
});
ability.can("SALES_ORDER_READ", "SALES_ORDER_READ") &&
sideBarLinks.push({
key: "sales_order",
path: APPLICATION_ROUTES.SALES_ORDER,
});
ability.can("SALES_ORDER_DECIMAL_READ", "SALES_ORDER_DECIMAL_READ") &&
sideBarLinks.push({
key: "sales_order_decimal",
path: APPLICATION_ROUTES.SALES_ORDER_DECIMAL,
});
ability.can("PRODUCT_ALERT_STOCK_READ", "PRODUCT_ALERT_STOCK_READ") &&
sideBarLinks.push({
key: "product_alert_stock",
path: APPLICATION_ROUTES.PRODUCT_ALERT_STOCK,
});
ability.can("CATALOG_PRODUCT_OPTION_TYPE_VALUE_READ", "CATALOG_PRODUCT_OPTION_TYPE_VALUE_READ") &&
sideBarLinks.push({
key: "catalog_product_option_type_value",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_VALUE,
});
ability.can("CMS_BLOCK_STORE_READ", "CMS_BLOCK_STORE_READ") &&
sideBarLinks.push({
key: "cms_block_store",
path: APPLICATION_ROUTES.CMS_BLOCK_STORE,
});
ability.can("EAV_ATTRIBUTE_READ", "EAV_ATTRIBUTE_READ") &&
sideBarLinks.push({
key: "eav_attribute",
path: APPLICATION_ROUTES.EAV_ATTRIBUTE,
});
ability.can("CUSTOMER_ENTITY_DATETIME_READ", "CUSTOMER_ENTITY_DATETIME_READ") &&
sideBarLinks.push({
key: "customer_entity_datetime",
path: APPLICATION_ROUTES.CUSTOMER_ENTITY_DATETIME,
});
ability.can("CORE_SESSION_READ", "CORE_SESSION_READ") &&
sideBarLinks.push({
key: "core_session",
path: APPLICATION_ROUTES.CORE_SESSION,
});
ability.can("WISHLIST_READ", "WISHLIST_READ") &&
sideBarLinks.push({
key: "wishlist",
path: APPLICATION_ROUTES.WISHLIST,
});
ability.can("CATALOG_CATEGORY_ENTITY_TEXT_READ", "CATALOG_CATEGORY_ENTITY_TEXT_READ") &&
sideBarLinks.push({
key: "catalog_category_entity_text",
path: APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_TEXT,
});
ability.can("CUSTOMER_ENTITY_DECIMAL_READ", "CUSTOMER_ENTITY_DECIMAL_READ") &&
sideBarLinks.push({
key: "customer_entity_decimal",
path: APPLICATION_ROUTES.CUSTOMER_ENTITY_DECIMAL,
});
ability.can("CATALOG_PRODUCT_ENTITY_TIER_PRICE_READ", "CATALOG_PRODUCT_ENTITY_TIER_PRICE_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_tier_price",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_TIER_PRICE,
});
ability.can("RATING_READ", "RATING_READ") &&
sideBarLinks.push({
key: "rating",
path: APPLICATION_ROUTES.RATING,
});
ability.can("POLL_READ", "POLL_READ") &&
sideBarLinks.push({
key: "poll",
path: APPLICATION_ROUTES.POLL,
});
ability.can("CHECKOUT_AGREEMENT_STORE_READ", "CHECKOUT_AGREEMENT_STORE_READ") &&
sideBarLinks.push({
key: "checkout_agreement_store",
path: APPLICATION_ROUTES.CHECKOUT_AGREEMENT_STORE,
});
ability.can("CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL_READ", "CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL_READ") &&
sideBarLinks.push({
key: "catalog_product_link_attribute_decimal",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL,
});
ability.can("CATALOGRULE_READ", "CATALOGRULE_READ") &&
sideBarLinks.push({
key: "catalogrule",
path: APPLICATION_ROUTES.CATALOGRULE,
});
ability.can("CORE_STORE_READ", "CORE_STORE_READ") &&
sideBarLinks.push({
key: "core_store",
path: APPLICATION_ROUTES.CORE_STORE,
});
ability.can("CATALOG_PRODUCT_BUNDLE_SELECTION_READ", "CATALOG_PRODUCT_BUNDLE_SELECTION_READ") &&
sideBarLinks.push({
key: "catalog_product_bundle_selection",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_SELECTION,
});
ability.can("CATALOG_PRODUCT_ENTITY_INT_READ", "CATALOG_PRODUCT_ENTITY_INT_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_int",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_INT,
});
ability.can("LOG_URL_READ", "LOG_URL_READ") &&
sideBarLinks.push({
key: "log_url",
path: APPLICATION_ROUTES.LOG_URL,
});
ability.can("CORE_EMAIL_TEMPLATE_READ", "CORE_EMAIL_TEMPLATE_READ") &&
sideBarLinks.push({
key: "core_email_template",
path: APPLICATION_ROUTES.CORE_EMAIL_TEMPLATE,
});
ability.can("RATING_STORE_READ", "RATING_STORE_READ") &&
sideBarLinks.push({
key: "rating_store",
path: APPLICATION_ROUTES.RATING_STORE,
});
ability.can("NEWSLETTER_QUEUE_READ", "NEWSLETTER_QUEUE_READ") &&
sideBarLinks.push({
key: "newsletter_queue",
path: APPLICATION_ROUTES.NEWSLETTER_QUEUE,
});
ability.can("TAG_READ", "TAG_READ") &&
sideBarLinks.push({
key: "tag",
path: APPLICATION_ROUTES.TAG,
});
ability.can("CUSTOMER_ADDRESS_ENTITY_INT_READ", "CUSTOMER_ADDRESS_ENTITY_INT_READ") &&
sideBarLinks.push({
key: "customer_address_entity_int",
path: APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_INT,
});
ability.can("SITEMAP_READ", "SITEMAP_READ") &&
sideBarLinks.push({
key: "sitemap",
path: APPLICATION_ROUTES.SITEMAP,
});
ability.can("CORE_LAYOUT_LINK_READ", "CORE_LAYOUT_LINK_READ") &&
sideBarLinks.push({
key: "core_layout_link",
path: APPLICATION_ROUTES.CORE_LAYOUT_LINK,
});
ability.can("CATALOG_PRODUCT_ENTITY_READ", "CATALOG_PRODUCT_ENTITY_READ") &&
sideBarLinks.push({
key: "catalog_product_entity",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY,
});
ability.can("CATALOG_PRODUCT_WEBSITE_READ", "CATALOG_PRODUCT_WEBSITE_READ") &&
sideBarLinks.push({
key: "catalog_product_website",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_WEBSITE,
});
ability.can("SALES_FLAT_QUOTE_READ", "SALES_FLAT_QUOTE_READ") &&
sideBarLinks.push({
key: "sales_flat_quote",
path: APPLICATION_ROUTES.SALES_FLAT_QUOTE,
});
ability.can("API_RULE_READ", "API_RULE_READ") &&
sideBarLinks.push({
key: "api_rule",
path: APPLICATION_ROUTES.API_RULE,
});
ability.can("CATALOG_PRODUCT_ENABLED_INDEX_READ", "CATALOG_PRODUCT_ENABLED_INDEX_READ") &&
sideBarLinks.push({
key: "catalog_product_enabled_index",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENABLED_INDEX,
});
ability.can("DIRECTORY_COUNTRY_READ", "DIRECTORY_COUNTRY_READ") &&
sideBarLinks.push({
key: "directory_country",
path: APPLICATION_ROUTES.DIRECTORY_COUNTRY,
});
ability.can("EAV_ENTITY_READ", "EAV_ENTITY_READ") &&
sideBarLinks.push({
key: "eav_entity",
path: APPLICATION_ROUTES.EAV_ENTITY,
});
ability.can("SALES_ORDER_INT_READ", "SALES_ORDER_INT_READ") &&
sideBarLinks.push({
key: "sales_order_int",
path: APPLICATION_ROUTES.SALES_ORDER_INT,
});
ability.can("CATALOGINDEX_MINIMAL_PRICE_READ", "CATALOGINDEX_MINIMAL_PRICE_READ") &&
sideBarLinks.push({
key: "catalogindex_minimal_price",
path: APPLICATION_ROUTES.CATALOGINDEX_MINIMAL_PRICE,
});
ability.can("API_ASSERT_READ", "API_ASSERT_READ") &&
sideBarLinks.push({
key: "api_assert",
path: APPLICATION_ROUTES.API_ASSERT,
});
ability.can("EAV_ENTITY_DECIMAL_READ", "EAV_ENTITY_DECIMAL_READ") &&
sideBarLinks.push({
key: "eav_entity_decimal",
path: APPLICATION_ROUTES.EAV_ENTITY_DECIMAL,
});
ability.can("RATING_ENTITY_READ", "RATING_ENTITY_READ") &&
sideBarLinks.push({
key: "rating_entity",
path: APPLICATION_ROUTES.RATING_ENTITY,
});
ability.can("CATALOG_PRODUCT_LINK_ATTRIBUTE_INT_READ", "CATALOG_PRODUCT_LINK_ATTRIBUTE_INT_READ") &&
sideBarLinks.push({
key: "catalog_product_link_attribute_int",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_INT,
});
ability.can("CORE_STORE_GROUP_READ", "CORE_STORE_GROUP_READ") &&
sideBarLinks.push({
key: "core_store_group",
path: APPLICATION_ROUTES.CORE_STORE_GROUP,
});
ability.can("CUSTOMER_GROUP_READ", "CUSTOMER_GROUP_READ") &&
sideBarLinks.push({
key: "customer_group",
path: APPLICATION_ROUTES.CUSTOMER_GROUP,
});
ability.can("CMS_PAGE_STORE_READ", "CMS_PAGE_STORE_READ") &&
sideBarLinks.push({
key: "cms_page_store",
path: APPLICATION_ROUTES.CMS_PAGE_STORE,
});
ability.can("CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRICING_READ", "CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRICING_READ") &&
sideBarLinks.push({
key: "catalog_product_super_attribute_pricing",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRICING,
});
ability.can("ADMIN_USER_READ", "ADMIN_USER_READ") &&
sideBarLinks.push({
key: "admin_user",
path: APPLICATION_ROUTES.ADMIN_USER,
});
ability.can("CATALOG_PRODUCT_ENTITY_DECIMAL_READ", "CATALOG_PRODUCT_ENTITY_DECIMAL_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_decimal",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_DECIMAL,
});
ability.can("POLL_ANSWER_READ", "POLL_ANSWER_READ") &&
sideBarLinks.push({
key: "poll_answer",
path: APPLICATION_ROUTES.POLL_ANSWER,
});
ability.can("CATALOG_PRODUCT_BUNDLE_OPTION_VALUE_READ", "CATALOG_PRODUCT_BUNDLE_OPTION_VALUE_READ") &&
sideBarLinks.push({
key: "catalog_product_bundle_option_value",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_OPTION_VALUE,
});
ability.can("CATALOG_PRODUCT_OPTION_PRICE_READ", "CATALOG_PRODUCT_OPTION_PRICE_READ") &&
sideBarLinks.push({
key: "catalog_product_option_price",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_PRICE,
});
ability.can("CHECKOUT_AGREEMENT_READ", "CHECKOUT_AGREEMENT_READ") &&
sideBarLinks.push({
key: "checkout_agreement",
path: APPLICATION_ROUTES.CHECKOUT_AGREEMENT,
});
ability.can("NEWSLETTER_SUBSCRIBER_READ", "NEWSLETTER_SUBSCRIBER_READ") &&
sideBarLinks.push({
key: "newsletter_subscriber",
path: APPLICATION_ROUTES.NEWSLETTER_SUBSCRIBER,
});
ability.can("CUSTOMER_ADDRESS_ENTITY_DECIMAL_READ", "CUSTOMER_ADDRESS_ENTITY_DECIMAL_READ") &&
sideBarLinks.push({
key: "customer_address_entity_decimal",
path: APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_DECIMAL,
});
ability.can("SALES_ORDER_ENTITY_VARCHAR_READ", "SALES_ORDER_ENTITY_VARCHAR_READ") &&
sideBarLinks.push({
key: "sales_order_entity_varchar",
path: APPLICATION_ROUTES.SALES_ORDER_ENTITY_VARCHAR,
});
ability.can("CATALOG_PRODUCT_SUPER_ATTRIBUTE_READ", "CATALOG_PRODUCT_SUPER_ATTRIBUTE_READ") &&
sideBarLinks.push({
key: "catalog_product_super_attribute",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE,
});
ability.can("CATALOG_CATEGORY_ENTITY_INT_READ", "CATALOG_CATEGORY_ENTITY_INT_READ") &&
sideBarLinks.push({
key: "catalog_category_entity_int",
path: APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_INT,
});
ability.can("CATALOGINDEX_PRICE_READ", "CATALOGINDEX_PRICE_READ") &&
sideBarLinks.push({
key: "catalogindex_price",
path: APPLICATION_ROUTES.CATALOGINDEX_PRICE,
});
ability.can("CATALOGRULE_PRODUCT_READ", "CATALOGRULE_PRODUCT_READ") &&
sideBarLinks.push({
key: "catalogrule_product",
path: APPLICATION_ROUTES.CATALOGRULE_PRODUCT,
});
ability.can("CATALOGRULE_PRODUCT_PRICE_READ", "CATALOGRULE_PRODUCT_PRICE_READ") &&
sideBarLinks.push({
key: "catalogrule_product_price",
path: APPLICATION_ROUTES.CATALOGRULE_PRODUCT_PRICE,
});
ability.can("EAV_ENTITY_VARCHAR_READ", "EAV_ENTITY_VARCHAR_READ") &&
sideBarLinks.push({
key: "eav_entity_varchar",
path: APPLICATION_ROUTES.EAV_ENTITY_VARCHAR,
});
ability.can("TAG_SUMMARY_READ", "TAG_SUMMARY_READ") &&
sideBarLinks.push({
key: "tag_summary",
path: APPLICATION_ROUTES.TAG_SUMMARY,
});
ability.can("API_ROLE_READ", "API_ROLE_READ") &&
sideBarLinks.push({
key: "api_role",
path: APPLICATION_ROUTES.API_ROLE,
});
ability.can("REPORT_EVENT_TYPES_READ", "REPORT_EVENT_TYPES_READ") &&
sideBarLinks.push({
key: "report_event_types",
path: APPLICATION_ROUTES.REPORT_EVENT_TYPES,
});
ability.can("CATALOG_PRODUCT_ENTITY_GALLERY_READ", "CATALOG_PRODUCT_ENTITY_GALLERY_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_gallery",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_GALLERY,
});
ability.can("CATALOG_PRODUCT_ENTITY_DATETIME_READ", "CATALOG_PRODUCT_ENTITY_DATETIME_READ") &&
sideBarLinks.push({
key: "catalog_product_entity_datetime",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_DATETIME,
});
ability.can("CUSTOMER_ADDRESS_ENTITY_VARCHAR_READ", "CUSTOMER_ADDRESS_ENTITY_VARCHAR_READ") &&
sideBarLinks.push({
key: "customer_address_entity_varchar",
path: APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_VARCHAR,
});
ability.can("SALES_ORDER_ENTITY_DATETIME_READ", "SALES_ORDER_ENTITY_DATETIME_READ") &&
sideBarLinks.push({
key: "sales_order_entity_datetime",
path: APPLICATION_ROUTES.SALES_ORDER_ENTITY_DATETIME,
});
ability.can("PAYPALUK_API_DEBUG_READ", "PAYPALUK_API_DEBUG_READ") &&
sideBarLinks.push({
key: "paypaluk_api_debug",
path: APPLICATION_ROUTES.PAYPALUK_API_DEBUG,
});
ability.can("EAV_ENTITY_DATETIME_READ", "EAV_ENTITY_DATETIME_READ") &&
sideBarLinks.push({
key: "eav_entity_datetime",
path: APPLICATION_ROUTES.EAV_ENTITY_DATETIME,
});
ability.can("DESIGN_CHANGE_READ", "DESIGN_CHANGE_READ") &&
sideBarLinks.push({
key: "design_change",
path: APPLICATION_ROUTES.DESIGN_CHANGE,
});
ability.can("EAV_ENTITY_TYPE_READ", "EAV_ENTITY_TYPE_READ") &&
sideBarLinks.push({
key: "eav_entity_type",
path: APPLICATION_ROUTES.EAV_ENTITY_TYPE,
});
ability.can("CORE_WEBSITE_READ", "CORE_WEBSITE_READ") &&
sideBarLinks.push({
key: "core_website",
path: APPLICATION_ROUTES.CORE_WEBSITE,
});
ability.can("CUSTOMER_ENTITY_TEXT_READ", "CUSTOMER_ENTITY_TEXT_READ") &&
sideBarLinks.push({
key: "customer_entity_text",
path: APPLICATION_ROUTES.CUSTOMER_ENTITY_TEXT,
});
ability.can("EAV_ENTITY_ATTRIBUTE_READ", "EAV_ENTITY_ATTRIBUTE_READ") &&
sideBarLinks.push({
key: "eav_entity_attribute",
path: APPLICATION_ROUTES.EAV_ENTITY_ATTRIBUTE,
});
ability.can("SENDFRIEND_LOG_READ", "SENDFRIEND_LOG_READ") &&
sideBarLinks.push({
key: "sendfriend_log",
path: APPLICATION_ROUTES.SENDFRIEND_LOG,
});
ability.can("TAX_CLASS_READ", "TAX_CLASS_READ") &&
sideBarLinks.push({
key: "tax_class",
path: APPLICATION_ROUTES.TAX_CLASS,
});
ability.can("CATALOG_PRODUCT_LINK_TYPE_READ", "CATALOG_PRODUCT_LINK_TYPE_READ") &&
sideBarLinks.push({
key: "catalog_product_link_type",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_TYPE,
});
ability.can("CATALOG_PRODUCT_OPTION_TYPE_PRICE_READ", "CATALOG_PRODUCT_OPTION_TYPE_PRICE_READ") &&
sideBarLinks.push({
key: "catalog_product_option_type_price",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_PRICE,
});
ability.can("LOG_VISITOR_INFO_READ", "LOG_VISITOR_INFO_READ") &&
sideBarLinks.push({
key: "log_visitor_info",
path: APPLICATION_ROUTES.LOG_VISITOR_INFO,
});
ability.can("ADMIN_RULE_READ", "ADMIN_RULE_READ") &&
sideBarLinks.push({
key: "admin_rule",
path: APPLICATION_ROUTES.ADMIN_RULE,
});
ability.can("RATING_OPTION_READ", "RATING_OPTION_READ") &&
sideBarLinks.push({
key: "rating_option",
path: APPLICATION_ROUTES.RATING_OPTION,
});
ability.can("CATALOG_CATEGORY_ENTITY_DATETIME_READ", "CATALOG_CATEGORY_ENTITY_DATETIME_READ") &&
sideBarLinks.push({
key: "catalog_category_entity_datetime",
path: APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_DATETIME,
});
ability.can("EAV_ENTITY_TEXT_READ", "EAV_ENTITY_TEXT_READ") &&
sideBarLinks.push({
key: "eav_entity_text",
path: APPLICATION_ROUTES.EAV_ENTITY_TEXT,
});
ability.can("CORE_LAYOUT_UPDATE_READ", "CORE_LAYOUT_UPDATE_READ") &&
sideBarLinks.push({
key: "core_layout_update",
path: APPLICATION_ROUTES.CORE_LAYOUT_UPDATE,
});
ability.can("EAV_ENTITY_STORE_READ", "EAV_ENTITY_STORE_READ") &&
sideBarLinks.push({
key: "eav_entity_store",
path: APPLICATION_ROUTES.EAV_ENTITY_STORE,
});
ability.can("POLL_STORE_READ", "POLL_STORE_READ") &&
sideBarLinks.push({
key: "poll_store",
path: APPLICATION_ROUTES.POLL_STORE,
});
ability.can("CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR_READ", "CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR_READ") &&
sideBarLinks.push({
key: "catalog_product_link_attribute_varchar",
path: APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR,
});
ability.can("SALES_ORDER_ENTITY_DECIMAL_READ", "SALES_ORDER_ENTITY_DECIMAL_READ") &&
sideBarLinks.push({
key: "sales_order_entity_decimal",
path: APPLICATION_ROUTES.SALES_ORDER_ENTITY_DECIMAL,
});
ability.can("EAV_ATTRIBUTE_OPTION_READ", "EAV_ATTRIBUTE_OPTION_READ") &&
sideBarLinks.push({
key: "eav_attribute_option",
path: APPLICATION_ROUTES.EAV_ATTRIBUTE_OPTION,
});
ability.can("DATAFLOW_BATCH_READ", "DATAFLOW_BATCH_READ") &&
sideBarLinks.push({
key: "dataflow_batch",
path: APPLICATION_ROUTES.DATAFLOW_BATCH,
});
ability.can("GIFT_MESSAGE_READ", "GIFT_MESSAGE_READ") &&
sideBarLinks.push({
key: "gift_message",
path: APPLICATION_ROUTES.GIFT_MESSAGE,
});
ability.can("NEWSLETTER_TEMPLATE_READ", "NEWSLETTER_TEMPLATE_READ") &&
sideBarLinks.push({
key: "newsletter_template",
path: APPLICATION_ROUTES.NEWSLETTER_TEMPLATE,
});
ability.can("REVIEW_STORE_READ", "REVIEW_STORE_READ") &&
sideBarLinks.push({
key: "review_store",
path: APPLICATION_ROUTES.REVIEW_STORE,
});
    user?.superUser && sideBarLinks.push({ key: "system_users", path: APPLICATION_ROUTES.SYSTEM_USERS });
    return sideBarLinks;
  }, [ability, user?.superUser]);

  const generateLink = (link: SideBarLink) => {
    return (
      <a
        key={link.key}
        className="nav-button"
        onClick={() => {
          setHiddenMenu(true);
          navigate(link.path);
        }}
      >
        <i className=" fas fa fa-cog" aria-hidden="true"></i>
        <span>{link.key.replaceAll("_", " ").toLocaleUpperCase()}</span>
      </a>
    );
  };
  const logOut = () => {
    AuthService.logout();
    navigate(APPLICATION_ROUTES.LOGOUT);
  };

  return (
    <div id="nav-bar">
      <ThemeToggle isHiddenMenu={hiddenMenu} />
      <input id="nav-toggle" type="checkbox" checked={hiddenMenu} />
      <div id="nav-header" onClick={() => setHiddenMenu((state) => !state)}>
        <div>
          <p id="nav-title">MENU</p>
        </div>

        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">{links.map(generateLink)}</div>
      <input id="nav-footer-toggle" type="checkbox" />
      <div id="nav-footer" onClick={logOut}>
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <img src="/svg/logout.png" alt={"logout"} />
          </div>
          <div id="nav-footer-titlebox">LOGOUT</div>
        </div>
        <div id="nav-footer-content"></div>
      </div>
    </div>
  );
};
