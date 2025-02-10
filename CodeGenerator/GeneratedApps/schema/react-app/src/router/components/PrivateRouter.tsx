import React, { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./WrappedRoute";
import { useUser } from "../../authService/UserProvider";
import { SideBar } from "../../generalComponents/sidebar/SideBar";
import { APPLICATION_ROUTES } from "../routes";
import { PageLoader } from "../../generalComponents";

const Dashboard = lazy(() => import("../../Home"));

const Catalog_product_option_type_titleIndex = lazy(() => import("../../pages/catalog_product_option_type_title/Catalog_product_option_type_titleIndex"));
const Catalog_product_option_type_titleById = lazy(() => import("../../pages/catalog_product_option_type_title/singlePage/Catalog_product_option_type_titlePage"));
const Cms_pageIndex = lazy(() => import("../../pages/cms_page/Cms_pageIndex"));
const Cms_pageById = lazy(() => import("../../pages/cms_page/singlePage/Cms_pagePage"));
const Dataflow_batch_importIndex = lazy(() => import("../../pages/dataflow_batch_import/Dataflow_batch_importIndex"));
const Dataflow_batch_importById = lazy(() => import("../../pages/dataflow_batch_import/singlePage/Dataflow_batch_importPage"));
const Customer_address_entity_textIndex = lazy(() => import("../../pages/customer_address_entity_text/Customer_address_entity_textIndex"));
const Customer_address_entity_textById = lazy(() => import("../../pages/customer_address_entity_text/singlePage/Customer_address_entity_textPage"));
const Dataflow_profileIndex = lazy(() => import("../../pages/dataflow_profile/Dataflow_profileIndex"));
const Dataflow_profileById = lazy(() => import("../../pages/dataflow_profile/singlePage/Dataflow_profilePage"));
const Newsletter_queue_linkIndex = lazy(() => import("../../pages/newsletter_queue_link/Newsletter_queue_linkIndex"));
const Newsletter_queue_linkById = lazy(() => import("../../pages/newsletter_queue_link/singlePage/Newsletter_queue_linkPage"));
const Admin_assertIndex = lazy(() => import("../../pages/admin_assert/Admin_assertIndex"));
const Admin_assertById = lazy(() => import("../../pages/admin_assert/singlePage/Admin_assertPage"));
const Cataloginventory_stockIndex = lazy(() => import("../../pages/cataloginventory_stock/Cataloginventory_stockIndex"));
const Cataloginventory_stockById = lazy(() => import("../../pages/cataloginventory_stock/singlePage/Cataloginventory_stockPage"));
const Dataflow_profile_historyIndex = lazy(() => import("../../pages/dataflow_profile_history/Dataflow_profile_historyIndex"));
const Dataflow_profile_historyById = lazy(() => import("../../pages/dataflow_profile_history/singlePage/Dataflow_profile_historyPage"));
const Sales_flat_quote_paymentIndex = lazy(() => import("../../pages/sales_flat_quote_payment/Sales_flat_quote_paymentIndex"));
const Sales_flat_quote_paymentById = lazy(() => import("../../pages/sales_flat_quote_payment/singlePage/Sales_flat_quote_paymentPage"));
const Sales_order_entity_intIndex = lazy(() => import("../../pages/sales_order_entity_int/Sales_order_entity_intIndex"));
const Sales_order_entity_intById = lazy(() => import("../../pages/sales_order_entity_int/singlePage/Sales_order_entity_intPage"));
const Tag_relationIndex = lazy(() => import("../../pages/tag_relation/Tag_relationIndex"));
const Tag_relationById = lazy(() => import("../../pages/tag_relation/singlePage/Tag_relationPage"));
const Wishlist_itemIndex = lazy(() => import("../../pages/wishlist_item/Wishlist_itemIndex"));
const Wishlist_itemById = lazy(() => import("../../pages/wishlist_item/singlePage/Wishlist_itemPage"));
const Salesrule_customerIndex = lazy(() => import("../../pages/salesrule_customer/Salesrule_customerIndex"));
const Salesrule_customerById = lazy(() => import("../../pages/salesrule_customer/singlePage/Salesrule_customerPage"));
const Customer_address_entityIndex = lazy(() => import("../../pages/customer_address_entity/Customer_address_entityIndex"));
const Customer_address_entityById = lazy(() => import("../../pages/customer_address_entity/singlePage/Customer_address_entityPage"));
const Googlecheckout_api_debugIndex = lazy(() => import("../../pages/googlecheckout_api_debug/Googlecheckout_api_debugIndex"));
const Googlecheckout_api_debugById = lazy(() => import("../../pages/googlecheckout_api_debug/singlePage/Googlecheckout_api_debugPage"));
const Catalog_product_entity_varcharIndex = lazy(() => import("../../pages/catalog_product_entity_varchar/Catalog_product_entity_varcharIndex"));
const Catalog_product_entity_varcharById = lazy(() => import("../../pages/catalog_product_entity_varchar/singlePage/Catalog_product_entity_varcharPage"));
const Core_config_dataIndex = lazy(() => import("../../pages/core_config_data/Core_config_dataIndex"));
const Core_config_dataById = lazy(() => import("../../pages/core_config_data/singlePage/Core_config_dataPage"));
const Directory_country_regionIndex = lazy(() => import("../../pages/directory_country_region/Directory_country_regionIndex"));
const Directory_country_regionById = lazy(() => import("../../pages/directory_country_region/singlePage/Directory_country_regionPage"));
const Directory_currency_rateIndex = lazy(() => import("../../pages/directory_currency_rate/Directory_currency_rateIndex"));
const Directory_currency_rateById = lazy(() => import("../../pages/directory_currency_rate/singlePage/Directory_currency_ratePage"));
const ReviewIndex = lazy(() => import("../../pages/review/ReviewIndex"));
const ReviewById = lazy(() => import("../../pages/review/singlePage/ReviewPage"));
const Review_entityIndex = lazy(() => import("../../pages/review_entity/Review_entityIndex"));
const Review_entityById = lazy(() => import("../../pages/review_entity/singlePage/Review_entityPage"));
const Log_summaryIndex = lazy(() => import("../../pages/log_summary/Log_summaryIndex"));
const Log_summaryById = lazy(() => import("../../pages/log_summary/singlePage/Log_summaryPage"));
const Rating_titleIndex = lazy(() => import("../../pages/rating_title/Rating_titleIndex"));
const Rating_titleById = lazy(() => import("../../pages/rating_title/singlePage/Rating_titlePage"));
const Shipping_tablerateIndex = lazy(() => import("../../pages/shipping_tablerate/Shipping_tablerateIndex"));
const Shipping_tablerateById = lazy(() => import("../../pages/shipping_tablerate/singlePage/Shipping_tableratePage"));
const Poll_voteIndex = lazy(() => import("../../pages/poll_vote/Poll_voteIndex"));
const Poll_voteById = lazy(() => import("../../pages/poll_vote/singlePage/Poll_votePage"));
const SalesruleIndex = lazy(() => import("../../pages/salesrule/SalesruleIndex"));
const SalesruleById = lazy(() => import("../../pages/salesrule/singlePage/SalesrulePage"));
const Catalog_product_entity_textIndex = lazy(() => import("../../pages/catalog_product_entity_text/Catalog_product_entity_textIndex"));
const Catalog_product_entity_textById = lazy(() => import("../../pages/catalog_product_entity_text/singlePage/Catalog_product_entity_textPage"));
const Newsletter_problemIndex = lazy(() => import("../../pages/newsletter_problem/Newsletter_problemIndex"));
const Newsletter_problemById = lazy(() => import("../../pages/newsletter_problem/singlePage/Newsletter_problemPage"));
const Sales_flat_quote_itemIndex = lazy(() => import("../../pages/sales_flat_quote_item/Sales_flat_quote_itemIndex"));
const Sales_flat_quote_itemById = lazy(() => import("../../pages/sales_flat_quote_item/singlePage/Sales_flat_quote_itemPage"));
const Eav_entity_intIndex = lazy(() => import("../../pages/eav_entity_int/Eav_entity_intIndex"));
const Eav_entity_intById = lazy(() => import("../../pages/eav_entity_int/singlePage/Eav_entity_intPage"));
const Eav_attribute_groupIndex = lazy(() => import("../../pages/eav_attribute_group/Eav_attribute_groupIndex"));
const Eav_attribute_groupById = lazy(() => import("../../pages/eav_attribute_group/singlePage/Eav_attribute_groupPage"));
const Dataflow_sessionIndex = lazy(() => import("../../pages/dataflow_session/Dataflow_sessionIndex"));
const Dataflow_sessionById = lazy(() => import("../../pages/dataflow_session/singlePage/Dataflow_sessionPage"));
const Directory_country_formatIndex = lazy(() => import("../../pages/directory_country_format/Directory_country_formatIndex"));
const Directory_country_formatById = lazy(() => import("../../pages/directory_country_format/singlePage/Directory_country_formatPage"));
const Tax_calculationIndex = lazy(() => import("../../pages/tax_calculation/Tax_calculationIndex"));
const Tax_calculationById = lazy(() => import("../../pages/tax_calculation/singlePage/Tax_calculationPage"));
const Core_url_rewriteIndex = lazy(() => import("../../pages/core_url_rewrite/Core_url_rewriteIndex"));
const Core_url_rewriteById = lazy(() => import("../../pages/core_url_rewrite/singlePage/Core_url_rewritePage"));
const Catalog_product_super_linkIndex = lazy(() => import("../../pages/catalog_product_super_link/Catalog_product_super_linkIndex"));
const Catalog_product_super_linkById = lazy(() => import("../../pages/catalog_product_super_link/singlePage/Catalog_product_super_linkPage"));
const Tax_calculation_ruleIndex = lazy(() => import("../../pages/tax_calculation_rule/Tax_calculation_ruleIndex"));
const Tax_calculation_ruleById = lazy(() => import("../../pages/tax_calculation_rule/singlePage/Tax_calculation_rulePage"));
const Catalog_product_linkIndex = lazy(() => import("../../pages/catalog_product_link/Catalog_product_linkIndex"));
const Catalog_product_linkById = lazy(() => import("../../pages/catalog_product_link/singlePage/Catalog_product_linkPage"));
const Log_url_infoIndex = lazy(() => import("../../pages/log_url_info/Log_url_infoIndex"));
const Log_url_infoById = lazy(() => import("../../pages/log_url_info/singlePage/Log_url_infoPage"));
const Rating_option_voteIndex = lazy(() => import("../../pages/rating_option_vote/Rating_option_voteIndex"));
const Rating_option_voteById = lazy(() => import("../../pages/rating_option_vote/singlePage/Rating_option_votePage"));
const Rating_option_vote_aggregatedIndex = lazy(() => import("../../pages/rating_option_vote_aggregated/Rating_option_vote_aggregatedIndex"));
const Rating_option_vote_aggregatedById = lazy(() => import("../../pages/rating_option_vote_aggregated/singlePage/Rating_option_vote_aggregatedPage"));
const Sales_flat_quote_item_optionIndex = lazy(() => import("../../pages/sales_flat_quote_item_option/Sales_flat_quote_item_optionIndex"));
const Sales_flat_quote_item_optionById = lazy(() => import("../../pages/sales_flat_quote_item_option/singlePage/Sales_flat_quote_item_optionPage"));
const Customer_entityIndex = lazy(() => import("../../pages/customer_entity/Customer_entityIndex"));
const Customer_entityById = lazy(() => import("../../pages/customer_entity/singlePage/Customer_entityPage"));
const Sales_order_datetimeIndex = lazy(() => import("../../pages/sales_order_datetime/Sales_order_datetimeIndex"));
const Sales_order_datetimeById = lazy(() => import("../../pages/sales_order_datetime/singlePage/Sales_order_datetimePage"));
const Review_entity_summaryIndex = lazy(() => import("../../pages/review_entity_summary/Review_entity_summaryIndex"));
const Review_entity_summaryById = lazy(() => import("../../pages/review_entity_summary/singlePage/Review_entity_summaryPage"));
const Core_resourceIndex = lazy(() => import("../../pages/core_resource/Core_resourceIndex"));
const Core_resourceById = lazy(() => import("../../pages/core_resource/singlePage/Core_resourcePage"));
const Sales_flat_quote_address_itemIndex = lazy(() => import("../../pages/sales_flat_quote_address_item/Sales_flat_quote_address_itemIndex"));
const Sales_flat_quote_address_itemById = lazy(() => import("../../pages/sales_flat_quote_address_item/singlePage/Sales_flat_quote_address_itemPage"));
const Customer_entity_varcharIndex = lazy(() => import("../../pages/customer_entity_varchar/Customer_entity_varcharIndex"));
const Customer_entity_varcharById = lazy(() => import("../../pages/customer_entity_varchar/singlePage/Customer_entity_varcharPage"));
const Customer_address_entity_datetimeIndex = lazy(() => import("../../pages/customer_address_entity_datetime/Customer_address_entity_datetimeIndex"));
const Customer_address_entity_datetimeById = lazy(() => import("../../pages/customer_address_entity_datetime/singlePage/Customer_address_entity_datetimePage"));
const Sales_order_textIndex = lazy(() => import("../../pages/sales_order_text/Sales_order_textIndex"));
const Sales_order_textById = lazy(() => import("../../pages/sales_order_text/singlePage/Sales_order_textPage"));
const Customer_entity_intIndex = lazy(() => import("../../pages/customer_entity_int/Customer_entity_intIndex"));
const Customer_entity_intById = lazy(() => import("../../pages/customer_entity_int/singlePage/Customer_entity_intPage"));
const Catalog_product_super_attribute_labelIndex = lazy(() => import("../../pages/catalog_product_super_attribute_label/Catalog_product_super_attribute_labelIndex"));
const Catalog_product_super_attribute_labelById = lazy(() => import("../../pages/catalog_product_super_attribute_label/singlePage/Catalog_product_super_attribute_labelPage"));
const Core_translateIndex = lazy(() => import("../../pages/core_translate/Core_translateIndex"));
const Core_translateById = lazy(() => import("../../pages/core_translate/singlePage/Core_translatePage"));
const Directory_country_region_nameIndex = lazy(() => import("../../pages/directory_country_region_name/Directory_country_region_nameIndex"));
const Directory_country_region_nameById = lazy(() => import("../../pages/directory_country_region_name/singlePage/Directory_country_region_namePage"));
const Tax_calculation_rateIndex = lazy(() => import("../../pages/tax_calculation_rate/Tax_calculation_rateIndex"));
const Tax_calculation_rateById = lazy(() => import("../../pages/tax_calculation_rate/singlePage/Tax_calculation_ratePage"));
const Catalog_product_entity_media_gallery_valueIndex = lazy(() => import("../../pages/catalog_product_entity_media_gallery_value/Catalog_product_entity_media_gallery_valueIndex"));
const Catalog_product_entity_media_gallery_valueById = lazy(() => import("../../pages/catalog_product_entity_media_gallery_value/singlePage/Catalog_product_entity_media_gallery_valuePage"));
const Catalog_compare_itemIndex = lazy(() => import("../../pages/catalog_compare_item/Catalog_compare_itemIndex"));
const Catalog_compare_itemById = lazy(() => import("../../pages/catalog_compare_item/singlePage/Catalog_compare_itemPage"));
const Catalog_product_entity_media_galleryIndex = lazy(() => import("../../pages/catalog_product_entity_media_gallery/Catalog_product_entity_media_galleryIndex"));
const Catalog_product_entity_media_galleryById = lazy(() => import("../../pages/catalog_product_entity_media_gallery/singlePage/Catalog_product_entity_media_galleryPage"));
const Log_summary_typeIndex = lazy(() => import("../../pages/log_summary_type/Log_summary_typeIndex"));
const Log_summary_typeById = lazy(() => import("../../pages/log_summary_type/singlePage/Log_summary_typePage"));
const Catalog_category_productIndex = lazy(() => import("../../pages/catalog_category_product/Catalog_category_productIndex"));
const Catalog_category_productById = lazy(() => import("../../pages/catalog_category_product/singlePage/Catalog_category_productPage"));
const Catalog_product_optionIndex = lazy(() => import("../../pages/catalog_product_option/Catalog_product_optionIndex"));
const Catalog_product_optionById = lazy(() => import("../../pages/catalog_product_option/singlePage/Catalog_product_optionPage"));
const Log_visitorIndex = lazy(() => import("../../pages/log_visitor/Log_visitorIndex"));
const Log_visitorById = lazy(() => import("../../pages/log_visitor/singlePage/Log_visitorPage"));
const Sales_flat_order_itemIndex = lazy(() => import("../../pages/sales_flat_order_item/Sales_flat_order_itemIndex"));
const Sales_flat_order_itemById = lazy(() => import("../../pages/sales_flat_order_item/singlePage/Sales_flat_order_itemPage"));
const Catalogindex_eavIndex = lazy(() => import("../../pages/catalogindex_eav/Catalogindex_eavIndex"));
const Catalogindex_eavById = lazy(() => import("../../pages/catalogindex_eav/singlePage/Catalogindex_eavPage"));
const Paygate_authorizenet_debugIndex = lazy(() => import("../../pages/paygate_authorizenet_debug/Paygate_authorizenet_debugIndex"));
const Paygate_authorizenet_debugById = lazy(() => import("../../pages/paygate_authorizenet_debug/singlePage/Paygate_authorizenet_debugPage"));
const Report_eventIndex = lazy(() => import("../../pages/report_event/Report_eventIndex"));
const Report_eventById = lazy(() => import("../../pages/report_event/singlePage/Report_eventPage"));
const Catalogsearch_queryIndex = lazy(() => import("../../pages/catalogsearch_query/Catalogsearch_queryIndex"));
const Catalogsearch_queryById = lazy(() => import("../../pages/catalogsearch_query/singlePage/Catalogsearch_queryPage"));
const Log_customerIndex = lazy(() => import("../../pages/log_customer/Log_customerIndex"));
const Log_customerById = lazy(() => import("../../pages/log_customer/singlePage/Log_customerPage"));
const Sales_order_entity_textIndex = lazy(() => import("../../pages/sales_order_entity_text/Sales_order_entity_textIndex"));
const Sales_order_entity_textById = lazy(() => import("../../pages/sales_order_entity_text/singlePage/Sales_order_entity_textPage"));
const Sales_order_varcharIndex = lazy(() => import("../../pages/sales_order_varchar/Sales_order_varcharIndex"));
const Sales_order_varcharById = lazy(() => import("../../pages/sales_order_varchar/singlePage/Sales_order_varcharPage"));
const Catalog_category_product_indexIndex = lazy(() => import("../../pages/catalog_category_product_index/Catalog_category_product_indexIndex"));
const Catalog_category_product_indexById = lazy(() => import("../../pages/catalog_category_product_index/singlePage/Catalog_category_product_indexPage"));
const Eav_attribute_option_valueIndex = lazy(() => import("../../pages/eav_attribute_option_value/Eav_attribute_option_valueIndex"));
const Eav_attribute_option_valueById = lazy(() => import("../../pages/eav_attribute_option_value/singlePage/Eav_attribute_option_valuePage"));
const Review_statusIndex = lazy(() => import("../../pages/review_status/Review_statusIndex"));
const Review_statusById = lazy(() => import("../../pages/review_status/singlePage/Review_statusPage"));
const Catalog_category_entity_varcharIndex = lazy(() => import("../../pages/catalog_category_entity_varchar/Catalog_category_entity_varcharIndex"));
const Catalog_category_entity_varcharById = lazy(() => import("../../pages/catalog_category_entity_varchar/singlePage/Catalog_category_entity_varcharPage"));
const Sales_flat_quote_shipping_rateIndex = lazy(() => import("../../pages/sales_flat_quote_shipping_rate/Sales_flat_quote_shipping_rateIndex"));
const Sales_flat_quote_shipping_rateById = lazy(() => import("../../pages/sales_flat_quote_shipping_rate/singlePage/Sales_flat_quote_shipping_ratePage"));
const Catalog_category_entityIndex = lazy(() => import("../../pages/catalog_category_entity/Catalog_category_entityIndex"));
const Catalog_category_entityById = lazy(() => import("../../pages/catalog_category_entity/singlePage/Catalog_category_entityPage"));
const Cms_blockIndex = lazy(() => import("../../pages/cms_block/Cms_blockIndex"));
const Cms_blockById = lazy(() => import("../../pages/cms_block/singlePage/Cms_blockPage"));
const Cataloginventory_stock_itemIndex = lazy(() => import("../../pages/cataloginventory_stock_item/Cataloginventory_stock_itemIndex"));
const Cataloginventory_stock_itemById = lazy(() => import("../../pages/cataloginventory_stock_item/singlePage/Cataloginventory_stock_itemPage"));
const Adminnotification_inboxIndex = lazy(() => import("../../pages/adminnotification_inbox/Adminnotification_inboxIndex"));
const Adminnotification_inboxById = lazy(() => import("../../pages/adminnotification_inbox/singlePage/Adminnotification_inboxPage"));
const Cron_scheduleIndex = lazy(() => import("../../pages/cron_schedule/Cron_scheduleIndex"));
const Cron_scheduleById = lazy(() => import("../../pages/cron_schedule/singlePage/Cron_schedulePage"));
const Admin_roleIndex = lazy(() => import("../../pages/admin_role/Admin_roleIndex"));
const Admin_roleById = lazy(() => import("../../pages/admin_role/singlePage/Admin_rolePage"));
const Sales_order_entityIndex = lazy(() => import("../../pages/sales_order_entity/Sales_order_entityIndex"));
const Sales_order_entityById = lazy(() => import("../../pages/sales_order_entity/singlePage/Sales_order_entityPage"));
const Catalog_category_entity_decimalIndex = lazy(() => import("../../pages/catalog_category_entity_decimal/Catalog_category_entity_decimalIndex"));
const Catalog_category_entity_decimalById = lazy(() => import("../../pages/catalog_category_entity_decimal/singlePage/Catalog_category_entity_decimalPage"));
const Product_alert_priceIndex = lazy(() => import("../../pages/product_alert_price/Product_alert_priceIndex"));
const Product_alert_priceById = lazy(() => import("../../pages/product_alert_price/singlePage/Product_alert_pricePage"));
const Sales_order_taxIndex = lazy(() => import("../../pages/sales_order_tax/Sales_order_taxIndex"));
const Sales_order_taxById = lazy(() => import("../../pages/sales_order_tax/singlePage/Sales_order_taxPage"));
const Review_detailIndex = lazy(() => import("../../pages/review_detail/Review_detailIndex"));
const Review_detailById = lazy(() => import("../../pages/review_detail/singlePage/Review_detailPage"));
const Sales_flat_quote_addressIndex = lazy(() => import("../../pages/sales_flat_quote_address/Sales_flat_quote_addressIndex"));
const Sales_flat_quote_addressById = lazy(() => import("../../pages/sales_flat_quote_address/singlePage/Sales_flat_quote_addressPage"));
const Dataflow_import_dataIndex = lazy(() => import("../../pages/dataflow_import_data/Dataflow_import_dataIndex"));
const Dataflow_import_dataById = lazy(() => import("../../pages/dataflow_import_data/singlePage/Dataflow_import_dataPage"));
const Catalog_product_link_attributeIndex = lazy(() => import("../../pages/catalog_product_link_attribute/Catalog_product_link_attributeIndex"));
const Catalog_product_link_attributeById = lazy(() => import("../../pages/catalog_product_link_attribute/singlePage/Catalog_product_link_attributePage"));
const Catalog_product_option_titleIndex = lazy(() => import("../../pages/catalog_product_option_title/Catalog_product_option_titleIndex"));
const Catalog_product_option_titleById = lazy(() => import("../../pages/catalog_product_option_title/singlePage/Catalog_product_option_titlePage"));
const Log_quoteIndex = lazy(() => import("../../pages/log_quote/Log_quoteIndex"));
const Log_quoteById = lazy(() => import("../../pages/log_quote/singlePage/Log_quotePage"));
const Catalog_product_bundle_optionIndex = lazy(() => import("../../pages/catalog_product_bundle_option/Catalog_product_bundle_optionIndex"));
const Catalog_product_bundle_optionById = lazy(() => import("../../pages/catalog_product_bundle_option/singlePage/Catalog_product_bundle_optionPage"));
const Tax_calculation_rate_titleIndex = lazy(() => import("../../pages/tax_calculation_rate_title/Tax_calculation_rate_titleIndex"));
const Tax_calculation_rate_titleById = lazy(() => import("../../pages/tax_calculation_rate_title/singlePage/Tax_calculation_rate_titlePage"));
const Paypal_api_debugIndex = lazy(() => import("../../pages/paypal_api_debug/Paypal_api_debugIndex"));
const Paypal_api_debugById = lazy(() => import("../../pages/paypal_api_debug/singlePage/Paypal_api_debugPage"));
const Api_userIndex = lazy(() => import("../../pages/api_user/Api_userIndex"));
const Api_userById = lazy(() => import("../../pages/api_user/singlePage/Api_userPage"));
const Dataflow_batch_exportIndex = lazy(() => import("../../pages/dataflow_batch_export/Dataflow_batch_exportIndex"));
const Dataflow_batch_exportById = lazy(() => import("../../pages/dataflow_batch_export/singlePage/Dataflow_batch_exportPage"));
const Eav_attribute_setIndex = lazy(() => import("../../pages/eav_attribute_set/Eav_attribute_setIndex"));
const Eav_attribute_setById = lazy(() => import("../../pages/eav_attribute_set/singlePage/Eav_attribute_setPage"));
const Newsletter_queue_store_linkIndex = lazy(() => import("../../pages/newsletter_queue_store_link/Newsletter_queue_store_linkIndex"));
const Newsletter_queue_store_linkById = lazy(() => import("../../pages/newsletter_queue_store_link/singlePage/Newsletter_queue_store_linkPage"));
const Sales_orderIndex = lazy(() => import("../../pages/sales_order/Sales_orderIndex"));
const Sales_orderById = lazy(() => import("../../pages/sales_order/singlePage/Sales_orderPage"));
const Sales_order_decimalIndex = lazy(() => import("../../pages/sales_order_decimal/Sales_order_decimalIndex"));
const Sales_order_decimalById = lazy(() => import("../../pages/sales_order_decimal/singlePage/Sales_order_decimalPage"));
const Product_alert_stockIndex = lazy(() => import("../../pages/product_alert_stock/Product_alert_stockIndex"));
const Product_alert_stockById = lazy(() => import("../../pages/product_alert_stock/singlePage/Product_alert_stockPage"));
const Catalog_product_option_type_valueIndex = lazy(() => import("../../pages/catalog_product_option_type_value/Catalog_product_option_type_valueIndex"));
const Catalog_product_option_type_valueById = lazy(() => import("../../pages/catalog_product_option_type_value/singlePage/Catalog_product_option_type_valuePage"));
const Cms_block_storeIndex = lazy(() => import("../../pages/cms_block_store/Cms_block_storeIndex"));
const Cms_block_storeById = lazy(() => import("../../pages/cms_block_store/singlePage/Cms_block_storePage"));
const Eav_attributeIndex = lazy(() => import("../../pages/eav_attribute/Eav_attributeIndex"));
const Eav_attributeById = lazy(() => import("../../pages/eav_attribute/singlePage/Eav_attributePage"));
const Customer_entity_datetimeIndex = lazy(() => import("../../pages/customer_entity_datetime/Customer_entity_datetimeIndex"));
const Customer_entity_datetimeById = lazy(() => import("../../pages/customer_entity_datetime/singlePage/Customer_entity_datetimePage"));
const Core_sessionIndex = lazy(() => import("../../pages/core_session/Core_sessionIndex"));
const Core_sessionById = lazy(() => import("../../pages/core_session/singlePage/Core_sessionPage"));
const WishlistIndex = lazy(() => import("../../pages/wishlist/WishlistIndex"));
const WishlistById = lazy(() => import("../../pages/wishlist/singlePage/WishlistPage"));
const Catalog_category_entity_textIndex = lazy(() => import("../../pages/catalog_category_entity_text/Catalog_category_entity_textIndex"));
const Catalog_category_entity_textById = lazy(() => import("../../pages/catalog_category_entity_text/singlePage/Catalog_category_entity_textPage"));
const Customer_entity_decimalIndex = lazy(() => import("../../pages/customer_entity_decimal/Customer_entity_decimalIndex"));
const Customer_entity_decimalById = lazy(() => import("../../pages/customer_entity_decimal/singlePage/Customer_entity_decimalPage"));
const Catalog_product_entity_tier_priceIndex = lazy(() => import("../../pages/catalog_product_entity_tier_price/Catalog_product_entity_tier_priceIndex"));
const Catalog_product_entity_tier_priceById = lazy(() => import("../../pages/catalog_product_entity_tier_price/singlePage/Catalog_product_entity_tier_pricePage"));
const RatingIndex = lazy(() => import("../../pages/rating/RatingIndex"));
const RatingById = lazy(() => import("../../pages/rating/singlePage/RatingPage"));
const PollIndex = lazy(() => import("../../pages/poll/PollIndex"));
const PollById = lazy(() => import("../../pages/poll/singlePage/PollPage"));
const Checkout_agreement_storeIndex = lazy(() => import("../../pages/checkout_agreement_store/Checkout_agreement_storeIndex"));
const Checkout_agreement_storeById = lazy(() => import("../../pages/checkout_agreement_store/singlePage/Checkout_agreement_storePage"));
const Catalog_product_link_attribute_decimalIndex = lazy(() => import("../../pages/catalog_product_link_attribute_decimal/Catalog_product_link_attribute_decimalIndex"));
const Catalog_product_link_attribute_decimalById = lazy(() => import("../../pages/catalog_product_link_attribute_decimal/singlePage/Catalog_product_link_attribute_decimalPage"));
const CatalogruleIndex = lazy(() => import("../../pages/catalogrule/CatalogruleIndex"));
const CatalogruleById = lazy(() => import("../../pages/catalogrule/singlePage/CatalogrulePage"));
const Core_storeIndex = lazy(() => import("../../pages/core_store/Core_storeIndex"));
const Core_storeById = lazy(() => import("../../pages/core_store/singlePage/Core_storePage"));
const Catalog_product_bundle_selectionIndex = lazy(() => import("../../pages/catalog_product_bundle_selection/Catalog_product_bundle_selectionIndex"));
const Catalog_product_bundle_selectionById = lazy(() => import("../../pages/catalog_product_bundle_selection/singlePage/Catalog_product_bundle_selectionPage"));
const Catalog_product_entity_intIndex = lazy(() => import("../../pages/catalog_product_entity_int/Catalog_product_entity_intIndex"));
const Catalog_product_entity_intById = lazy(() => import("../../pages/catalog_product_entity_int/singlePage/Catalog_product_entity_intPage"));
const Log_urlIndex = lazy(() => import("../../pages/log_url/Log_urlIndex"));
const Log_urlById = lazy(() => import("../../pages/log_url/singlePage/Log_urlPage"));
const Core_email_templateIndex = lazy(() => import("../../pages/core_email_template/Core_email_templateIndex"));
const Core_email_templateById = lazy(() => import("../../pages/core_email_template/singlePage/Core_email_templatePage"));
const Rating_storeIndex = lazy(() => import("../../pages/rating_store/Rating_storeIndex"));
const Rating_storeById = lazy(() => import("../../pages/rating_store/singlePage/Rating_storePage"));
const Newsletter_queueIndex = lazy(() => import("../../pages/newsletter_queue/Newsletter_queueIndex"));
const Newsletter_queueById = lazy(() => import("../../pages/newsletter_queue/singlePage/Newsletter_queuePage"));
const TagIndex = lazy(() => import("../../pages/tag/TagIndex"));
const TagById = lazy(() => import("../../pages/tag/singlePage/TagPage"));
const Customer_address_entity_intIndex = lazy(() => import("../../pages/customer_address_entity_int/Customer_address_entity_intIndex"));
const Customer_address_entity_intById = lazy(() => import("../../pages/customer_address_entity_int/singlePage/Customer_address_entity_intPage"));
const SitemapIndex = lazy(() => import("../../pages/sitemap/SitemapIndex"));
const SitemapById = lazy(() => import("../../pages/sitemap/singlePage/SitemapPage"));
const Core_layout_linkIndex = lazy(() => import("../../pages/core_layout_link/Core_layout_linkIndex"));
const Core_layout_linkById = lazy(() => import("../../pages/core_layout_link/singlePage/Core_layout_linkPage"));
const Catalog_product_entityIndex = lazy(() => import("../../pages/catalog_product_entity/Catalog_product_entityIndex"));
const Catalog_product_entityById = lazy(() => import("../../pages/catalog_product_entity/singlePage/Catalog_product_entityPage"));
const Catalog_product_websiteIndex = lazy(() => import("../../pages/catalog_product_website/Catalog_product_websiteIndex"));
const Catalog_product_websiteById = lazy(() => import("../../pages/catalog_product_website/singlePage/Catalog_product_websitePage"));
const Sales_flat_quoteIndex = lazy(() => import("../../pages/sales_flat_quote/Sales_flat_quoteIndex"));
const Sales_flat_quoteById = lazy(() => import("../../pages/sales_flat_quote/singlePage/Sales_flat_quotePage"));
const Api_ruleIndex = lazy(() => import("../../pages/api_rule/Api_ruleIndex"));
const Api_ruleById = lazy(() => import("../../pages/api_rule/singlePage/Api_rulePage"));
const Catalog_product_enabled_indexIndex = lazy(() => import("../../pages/catalog_product_enabled_index/Catalog_product_enabled_indexIndex"));
const Catalog_product_enabled_indexById = lazy(() => import("../../pages/catalog_product_enabled_index/singlePage/Catalog_product_enabled_indexPage"));
const Directory_countryIndex = lazy(() => import("../../pages/directory_country/Directory_countryIndex"));
const Directory_countryById = lazy(() => import("../../pages/directory_country/singlePage/Directory_countryPage"));
const Eav_entityIndex = lazy(() => import("../../pages/eav_entity/Eav_entityIndex"));
const Eav_entityById = lazy(() => import("../../pages/eav_entity/singlePage/Eav_entityPage"));
const Sales_order_intIndex = lazy(() => import("../../pages/sales_order_int/Sales_order_intIndex"));
const Sales_order_intById = lazy(() => import("../../pages/sales_order_int/singlePage/Sales_order_intPage"));
const Catalogindex_minimal_priceIndex = lazy(() => import("../../pages/catalogindex_minimal_price/Catalogindex_minimal_priceIndex"));
const Catalogindex_minimal_priceById = lazy(() => import("../../pages/catalogindex_minimal_price/singlePage/Catalogindex_minimal_pricePage"));
const Api_assertIndex = lazy(() => import("../../pages/api_assert/Api_assertIndex"));
const Api_assertById = lazy(() => import("../../pages/api_assert/singlePage/Api_assertPage"));
const Eav_entity_decimalIndex = lazy(() => import("../../pages/eav_entity_decimal/Eav_entity_decimalIndex"));
const Eav_entity_decimalById = lazy(() => import("../../pages/eav_entity_decimal/singlePage/Eav_entity_decimalPage"));
const Rating_entityIndex = lazy(() => import("../../pages/rating_entity/Rating_entityIndex"));
const Rating_entityById = lazy(() => import("../../pages/rating_entity/singlePage/Rating_entityPage"));
const Catalog_product_link_attribute_intIndex = lazy(() => import("../../pages/catalog_product_link_attribute_int/Catalog_product_link_attribute_intIndex"));
const Catalog_product_link_attribute_intById = lazy(() => import("../../pages/catalog_product_link_attribute_int/singlePage/Catalog_product_link_attribute_intPage"));
const Core_store_groupIndex = lazy(() => import("../../pages/core_store_group/Core_store_groupIndex"));
const Core_store_groupById = lazy(() => import("../../pages/core_store_group/singlePage/Core_store_groupPage"));
const Customer_groupIndex = lazy(() => import("../../pages/customer_group/Customer_groupIndex"));
const Customer_groupById = lazy(() => import("../../pages/customer_group/singlePage/Customer_groupPage"));
const Cms_page_storeIndex = lazy(() => import("../../pages/cms_page_store/Cms_page_storeIndex"));
const Cms_page_storeById = lazy(() => import("../../pages/cms_page_store/singlePage/Cms_page_storePage"));
const Catalog_product_super_attribute_pricingIndex = lazy(() => import("../../pages/catalog_product_super_attribute_pricing/Catalog_product_super_attribute_pricingIndex"));
const Catalog_product_super_attribute_pricingById = lazy(() => import("../../pages/catalog_product_super_attribute_pricing/singlePage/Catalog_product_super_attribute_pricingPage"));
const Admin_userIndex = lazy(() => import("../../pages/admin_user/Admin_userIndex"));
const Admin_userById = lazy(() => import("../../pages/admin_user/singlePage/Admin_userPage"));
const Catalog_product_entity_decimalIndex = lazy(() => import("../../pages/catalog_product_entity_decimal/Catalog_product_entity_decimalIndex"));
const Catalog_product_entity_decimalById = lazy(() => import("../../pages/catalog_product_entity_decimal/singlePage/Catalog_product_entity_decimalPage"));
const Poll_answerIndex = lazy(() => import("../../pages/poll_answer/Poll_answerIndex"));
const Poll_answerById = lazy(() => import("../../pages/poll_answer/singlePage/Poll_answerPage"));
const Catalog_product_bundle_option_valueIndex = lazy(() => import("../../pages/catalog_product_bundle_option_value/Catalog_product_bundle_option_valueIndex"));
const Catalog_product_bundle_option_valueById = lazy(() => import("../../pages/catalog_product_bundle_option_value/singlePage/Catalog_product_bundle_option_valuePage"));
const Catalog_product_option_priceIndex = lazy(() => import("../../pages/catalog_product_option_price/Catalog_product_option_priceIndex"));
const Catalog_product_option_priceById = lazy(() => import("../../pages/catalog_product_option_price/singlePage/Catalog_product_option_pricePage"));
const Checkout_agreementIndex = lazy(() => import("../../pages/checkout_agreement/Checkout_agreementIndex"));
const Checkout_agreementById = lazy(() => import("../../pages/checkout_agreement/singlePage/Checkout_agreementPage"));
const Newsletter_subscriberIndex = lazy(() => import("../../pages/newsletter_subscriber/Newsletter_subscriberIndex"));
const Newsletter_subscriberById = lazy(() => import("../../pages/newsletter_subscriber/singlePage/Newsletter_subscriberPage"));
const Customer_address_entity_decimalIndex = lazy(() => import("../../pages/customer_address_entity_decimal/Customer_address_entity_decimalIndex"));
const Customer_address_entity_decimalById = lazy(() => import("../../pages/customer_address_entity_decimal/singlePage/Customer_address_entity_decimalPage"));
const Sales_order_entity_varcharIndex = lazy(() => import("../../pages/sales_order_entity_varchar/Sales_order_entity_varcharIndex"));
const Sales_order_entity_varcharById = lazy(() => import("../../pages/sales_order_entity_varchar/singlePage/Sales_order_entity_varcharPage"));
const Catalog_product_super_attributeIndex = lazy(() => import("../../pages/catalog_product_super_attribute/Catalog_product_super_attributeIndex"));
const Catalog_product_super_attributeById = lazy(() => import("../../pages/catalog_product_super_attribute/singlePage/Catalog_product_super_attributePage"));
const Catalog_category_entity_intIndex = lazy(() => import("../../pages/catalog_category_entity_int/Catalog_category_entity_intIndex"));
const Catalog_category_entity_intById = lazy(() => import("../../pages/catalog_category_entity_int/singlePage/Catalog_category_entity_intPage"));
const Catalogindex_priceIndex = lazy(() => import("../../pages/catalogindex_price/Catalogindex_priceIndex"));
const Catalogindex_priceById = lazy(() => import("../../pages/catalogindex_price/singlePage/Catalogindex_pricePage"));
const Catalogrule_productIndex = lazy(() => import("../../pages/catalogrule_product/Catalogrule_productIndex"));
const Catalogrule_productById = lazy(() => import("../../pages/catalogrule_product/singlePage/Catalogrule_productPage"));
const Catalogrule_product_priceIndex = lazy(() => import("../../pages/catalogrule_product_price/Catalogrule_product_priceIndex"));
const Catalogrule_product_priceById = lazy(() => import("../../pages/catalogrule_product_price/singlePage/Catalogrule_product_pricePage"));
const Eav_entity_varcharIndex = lazy(() => import("../../pages/eav_entity_varchar/Eav_entity_varcharIndex"));
const Eav_entity_varcharById = lazy(() => import("../../pages/eav_entity_varchar/singlePage/Eav_entity_varcharPage"));
const Tag_summaryIndex = lazy(() => import("../../pages/tag_summary/Tag_summaryIndex"));
const Tag_summaryById = lazy(() => import("../../pages/tag_summary/singlePage/Tag_summaryPage"));
const Api_roleIndex = lazy(() => import("../../pages/api_role/Api_roleIndex"));
const Api_roleById = lazy(() => import("../../pages/api_role/singlePage/Api_rolePage"));
const Report_event_typesIndex = lazy(() => import("../../pages/report_event_types/Report_event_typesIndex"));
const Report_event_typesById = lazy(() => import("../../pages/report_event_types/singlePage/Report_event_typesPage"));
const Catalog_product_entity_galleryIndex = lazy(() => import("../../pages/catalog_product_entity_gallery/Catalog_product_entity_galleryIndex"));
const Catalog_product_entity_galleryById = lazy(() => import("../../pages/catalog_product_entity_gallery/singlePage/Catalog_product_entity_galleryPage"));
const Catalog_product_entity_datetimeIndex = lazy(() => import("../../pages/catalog_product_entity_datetime/Catalog_product_entity_datetimeIndex"));
const Catalog_product_entity_datetimeById = lazy(() => import("../../pages/catalog_product_entity_datetime/singlePage/Catalog_product_entity_datetimePage"));
const Customer_address_entity_varcharIndex = lazy(() => import("../../pages/customer_address_entity_varchar/Customer_address_entity_varcharIndex"));
const Customer_address_entity_varcharById = lazy(() => import("../../pages/customer_address_entity_varchar/singlePage/Customer_address_entity_varcharPage"));
const Sales_order_entity_datetimeIndex = lazy(() => import("../../pages/sales_order_entity_datetime/Sales_order_entity_datetimeIndex"));
const Sales_order_entity_datetimeById = lazy(() => import("../../pages/sales_order_entity_datetime/singlePage/Sales_order_entity_datetimePage"));
const Paypaluk_api_debugIndex = lazy(() => import("../../pages/paypaluk_api_debug/Paypaluk_api_debugIndex"));
const Paypaluk_api_debugById = lazy(() => import("../../pages/paypaluk_api_debug/singlePage/Paypaluk_api_debugPage"));
const Eav_entity_datetimeIndex = lazy(() => import("../../pages/eav_entity_datetime/Eav_entity_datetimeIndex"));
const Eav_entity_datetimeById = lazy(() => import("../../pages/eav_entity_datetime/singlePage/Eav_entity_datetimePage"));
const Design_changeIndex = lazy(() => import("../../pages/design_change/Design_changeIndex"));
const Design_changeById = lazy(() => import("../../pages/design_change/singlePage/Design_changePage"));
const Eav_entity_typeIndex = lazy(() => import("../../pages/eav_entity_type/Eav_entity_typeIndex"));
const Eav_entity_typeById = lazy(() => import("../../pages/eav_entity_type/singlePage/Eav_entity_typePage"));
const Core_websiteIndex = lazy(() => import("../../pages/core_website/Core_websiteIndex"));
const Core_websiteById = lazy(() => import("../../pages/core_website/singlePage/Core_websitePage"));
const Customer_entity_textIndex = lazy(() => import("../../pages/customer_entity_text/Customer_entity_textIndex"));
const Customer_entity_textById = lazy(() => import("../../pages/customer_entity_text/singlePage/Customer_entity_textPage"));
const Eav_entity_attributeIndex = lazy(() => import("../../pages/eav_entity_attribute/Eav_entity_attributeIndex"));
const Eav_entity_attributeById = lazy(() => import("../../pages/eav_entity_attribute/singlePage/Eav_entity_attributePage"));
const Sendfriend_logIndex = lazy(() => import("../../pages/sendfriend_log/Sendfriend_logIndex"));
const Sendfriend_logById = lazy(() => import("../../pages/sendfriend_log/singlePage/Sendfriend_logPage"));
const Tax_classIndex = lazy(() => import("../../pages/tax_class/Tax_classIndex"));
const Tax_classById = lazy(() => import("../../pages/tax_class/singlePage/Tax_classPage"));
const Catalog_product_link_typeIndex = lazy(() => import("../../pages/catalog_product_link_type/Catalog_product_link_typeIndex"));
const Catalog_product_link_typeById = lazy(() => import("../../pages/catalog_product_link_type/singlePage/Catalog_product_link_typePage"));
const Catalog_product_option_type_priceIndex = lazy(() => import("../../pages/catalog_product_option_type_price/Catalog_product_option_type_priceIndex"));
const Catalog_product_option_type_priceById = lazy(() => import("../../pages/catalog_product_option_type_price/singlePage/Catalog_product_option_type_pricePage"));
const Log_visitor_infoIndex = lazy(() => import("../../pages/log_visitor_info/Log_visitor_infoIndex"));
const Log_visitor_infoById = lazy(() => import("../../pages/log_visitor_info/singlePage/Log_visitor_infoPage"));
const Admin_ruleIndex = lazy(() => import("../../pages/admin_rule/Admin_ruleIndex"));
const Admin_ruleById = lazy(() => import("../../pages/admin_rule/singlePage/Admin_rulePage"));
const Rating_optionIndex = lazy(() => import("../../pages/rating_option/Rating_optionIndex"));
const Rating_optionById = lazy(() => import("../../pages/rating_option/singlePage/Rating_optionPage"));
const Catalog_category_entity_datetimeIndex = lazy(() => import("../../pages/catalog_category_entity_datetime/Catalog_category_entity_datetimeIndex"));
const Catalog_category_entity_datetimeById = lazy(() => import("../../pages/catalog_category_entity_datetime/singlePage/Catalog_category_entity_datetimePage"));
const Eav_entity_textIndex = lazy(() => import("../../pages/eav_entity_text/Eav_entity_textIndex"));
const Eav_entity_textById = lazy(() => import("../../pages/eav_entity_text/singlePage/Eav_entity_textPage"));
const Core_layout_updateIndex = lazy(() => import("../../pages/core_layout_update/Core_layout_updateIndex"));
const Core_layout_updateById = lazy(() => import("../../pages/core_layout_update/singlePage/Core_layout_updatePage"));
const Eav_entity_storeIndex = lazy(() => import("../../pages/eav_entity_store/Eav_entity_storeIndex"));
const Eav_entity_storeById = lazy(() => import("../../pages/eav_entity_store/singlePage/Eav_entity_storePage"));
const Poll_storeIndex = lazy(() => import("../../pages/poll_store/Poll_storeIndex"));
const Poll_storeById = lazy(() => import("../../pages/poll_store/singlePage/Poll_storePage"));
const Catalog_product_link_attribute_varcharIndex = lazy(() => import("../../pages/catalog_product_link_attribute_varchar/Catalog_product_link_attribute_varcharIndex"));
const Catalog_product_link_attribute_varcharById = lazy(() => import("../../pages/catalog_product_link_attribute_varchar/singlePage/Catalog_product_link_attribute_varcharPage"));
const Sales_order_entity_decimalIndex = lazy(() => import("../../pages/sales_order_entity_decimal/Sales_order_entity_decimalIndex"));
const Sales_order_entity_decimalById = lazy(() => import("../../pages/sales_order_entity_decimal/singlePage/Sales_order_entity_decimalPage"));
const Eav_attribute_optionIndex = lazy(() => import("../../pages/eav_attribute_option/Eav_attribute_optionIndex"));
const Eav_attribute_optionById = lazy(() => import("../../pages/eav_attribute_option/singlePage/Eav_attribute_optionPage"));
const Dataflow_batchIndex = lazy(() => import("../../pages/dataflow_batch/Dataflow_batchIndex"));
const Dataflow_batchById = lazy(() => import("../../pages/dataflow_batch/singlePage/Dataflow_batchPage"));
const Gift_messageIndex = lazy(() => import("../../pages/gift_message/Gift_messageIndex"));
const Gift_messageById = lazy(() => import("../../pages/gift_message/singlePage/Gift_messagePage"));
const Newsletter_templateIndex = lazy(() => import("../../pages/newsletter_template/Newsletter_templateIndex"));
const Newsletter_templateById = lazy(() => import("../../pages/newsletter_template/singlePage/Newsletter_templatePage"));
const Review_storeIndex = lazy(() => import("../../pages/review_store/Review_storeIndex"));
const Review_storeById = lazy(() => import("../../pages/review_store/singlePage/Review_storePage"));

const IndexSystemUsers = lazy(() => import("../../systemUsers/SystemUserIndex"));

const PrivateRouter = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SideBar />

        <Suspense>
          <Routes>
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_TITLE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_TYPE_TITLE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_type_titleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_TITLE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_TYPE_TITLE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_type_titleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CMS_PAGE}
 element={ <ProtectedRoute subject={"CMS_PAGE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Cms_pageIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CMS_PAGE}/:id`}
              element={
                <ProtectedRoute subject={"CMS_PAGE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Cms_pageById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DATAFLOW_BATCH_IMPORT}
 element={ <ProtectedRoute subject={"DATAFLOW_BATCH_IMPORT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Dataflow_batch_importIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DATAFLOW_BATCH_IMPORT}/:id`}
              element={
                <ProtectedRoute subject={"DATAFLOW_BATCH_IMPORT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Dataflow_batch_importById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_TEXT}
 element={ <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_TEXT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_textIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_TEXT}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_TEXT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_textById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DATAFLOW_PROFILE}
 element={ <ProtectedRoute subject={"DATAFLOW_PROFILE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Dataflow_profileIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DATAFLOW_PROFILE}/:id`}
              element={
                <ProtectedRoute subject={"DATAFLOW_PROFILE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Dataflow_profileById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.NEWSLETTER_QUEUE_LINK}
 element={ <ProtectedRoute subject={"NEWSLETTER_QUEUE_LINK_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Newsletter_queue_linkIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.NEWSLETTER_QUEUE_LINK}/:id`}
              element={
                <ProtectedRoute subject={"NEWSLETTER_QUEUE_LINK_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Newsletter_queue_linkById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.ADMIN_ASSERT}
 element={ <ProtectedRoute subject={"ADMIN_ASSERT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Admin_assertIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.ADMIN_ASSERT}/:id`}
              element={
                <ProtectedRoute subject={"ADMIN_ASSERT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Admin_assertById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGINVENTORY_STOCK}
 element={ <ProtectedRoute subject={"CATALOGINVENTORY_STOCK_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Cataloginventory_stockIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGINVENTORY_STOCK}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGINVENTORY_STOCK_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Cataloginventory_stockById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DATAFLOW_PROFILE_HISTORY}
 element={ <ProtectedRoute subject={"DATAFLOW_PROFILE_HISTORY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Dataflow_profile_historyIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DATAFLOW_PROFILE_HISTORY}/:id`}
              element={
                <ProtectedRoute subject={"DATAFLOW_PROFILE_HISTORY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Dataflow_profile_historyById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_FLAT_QUOTE_PAYMENT}
 element={ <ProtectedRoute subject={"SALES_FLAT_QUOTE_PAYMENT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_paymentIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_FLAT_QUOTE_PAYMENT}/:id`}
              element={
                <ProtectedRoute subject={"SALES_FLAT_QUOTE_PAYMENT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_paymentById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_ENTITY_INT}
 element={ <ProtectedRoute subject={"SALES_ORDER_ENTITY_INT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_intIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_ENTITY_INT}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_ENTITY_INT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_intById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.TAG_RELATION}
 element={ <ProtectedRoute subject={"TAG_RELATION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Tag_relationIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.TAG_RELATION}/:id`}
              element={
                <ProtectedRoute subject={"TAG_RELATION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Tag_relationById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.WISHLIST_ITEM}
 element={ <ProtectedRoute subject={"WISHLIST_ITEM_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Wishlist_itemIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.WISHLIST_ITEM}/:id`}
              element={
                <ProtectedRoute subject={"WISHLIST_ITEM_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Wishlist_itemById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALESRULE_CUSTOMER}
 element={ <ProtectedRoute subject={"SALESRULE_CUSTOMER_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Salesrule_customerIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALESRULE_CUSTOMER}/:id`}
              element={
                <ProtectedRoute subject={"SALESRULE_CUSTOMER_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Salesrule_customerById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY}
 element={ <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_address_entityIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_address_entityById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.GOOGLECHECKOUT_API_DEBUG}
 element={ <ProtectedRoute subject={"GOOGLECHECKOUT_API_DEBUG_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Googlecheckout_api_debugIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.GOOGLECHECKOUT_API_DEBUG}/:id`}
              element={
                <ProtectedRoute subject={"GOOGLECHECKOUT_API_DEBUG_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Googlecheckout_api_debugById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_VARCHAR}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_VARCHAR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_varcharIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_VARCHAR}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_VARCHAR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_varcharById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_CONFIG_DATA}
 element={ <ProtectedRoute subject={"CORE_CONFIG_DATA_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_config_dataIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_CONFIG_DATA}/:id`}
              element={
                <ProtectedRoute subject={"CORE_CONFIG_DATA_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_config_dataById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DIRECTORY_COUNTRY_REGION}
 element={ <ProtectedRoute subject={"DIRECTORY_COUNTRY_REGION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Directory_country_regionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DIRECTORY_COUNTRY_REGION}/:id`}
              element={
                <ProtectedRoute subject={"DIRECTORY_COUNTRY_REGION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Directory_country_regionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DIRECTORY_CURRENCY_RATE}
 element={ <ProtectedRoute subject={"DIRECTORY_CURRENCY_RATE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Directory_currency_rateIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DIRECTORY_CURRENCY_RATE}/:id`}
              element={
                <ProtectedRoute subject={"DIRECTORY_CURRENCY_RATE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Directory_currency_rateById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.REVIEW}
 element={ <ProtectedRoute subject={"REVIEW_READ"}>
<Suspense fallback={<PageLoader />}>
                    <ReviewIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.REVIEW}/:id`}
              element={
                <ProtectedRoute subject={"REVIEW_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <ReviewById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.REVIEW_ENTITY}
 element={ <ProtectedRoute subject={"REVIEW_ENTITY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Review_entityIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.REVIEW_ENTITY}/:id`}
              element={
                <ProtectedRoute subject={"REVIEW_ENTITY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Review_entityById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.LOG_SUMMARY}
 element={ <ProtectedRoute subject={"LOG_SUMMARY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Log_summaryIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.LOG_SUMMARY}/:id`}
              element={
                <ProtectedRoute subject={"LOG_SUMMARY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Log_summaryById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.RATING_TITLE}
 element={ <ProtectedRoute subject={"RATING_TITLE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Rating_titleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.RATING_TITLE}/:id`}
              element={
                <ProtectedRoute subject={"RATING_TITLE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Rating_titleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SHIPPING_TABLERATE}
 element={ <ProtectedRoute subject={"SHIPPING_TABLERATE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Shipping_tablerateIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SHIPPING_TABLERATE}/:id`}
              element={
                <ProtectedRoute subject={"SHIPPING_TABLERATE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Shipping_tablerateById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.POLL_VOTE}
 element={ <ProtectedRoute subject={"POLL_VOTE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Poll_voteIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.POLL_VOTE}/:id`}
              element={
                <ProtectedRoute subject={"POLL_VOTE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Poll_voteById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALESRULE}
 element={ <ProtectedRoute subject={"SALESRULE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <SalesruleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALESRULE}/:id`}
              element={
                <ProtectedRoute subject={"SALESRULE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <SalesruleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_TEXT}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_TEXT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_textIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_TEXT}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_TEXT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_textById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.NEWSLETTER_PROBLEM}
 element={ <ProtectedRoute subject={"NEWSLETTER_PROBLEM_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Newsletter_problemIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.NEWSLETTER_PROBLEM}/:id`}
              element={
                <ProtectedRoute subject={"NEWSLETTER_PROBLEM_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Newsletter_problemById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_FLAT_QUOTE_ITEM}
 element={ <ProtectedRoute subject={"SALES_FLAT_QUOTE_ITEM_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_itemIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_FLAT_QUOTE_ITEM}/:id`}
              element={
                <ProtectedRoute subject={"SALES_FLAT_QUOTE_ITEM_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_itemById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY_INT}
 element={ <ProtectedRoute subject={"EAV_ENTITY_INT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entity_intIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY_INT}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_INT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entity_intById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ATTRIBUTE_GROUP}
 element={ <ProtectedRoute subject={"EAV_ATTRIBUTE_GROUP_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_attribute_groupIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ATTRIBUTE_GROUP}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ATTRIBUTE_GROUP_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_attribute_groupById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DATAFLOW_SESSION}
 element={ <ProtectedRoute subject={"DATAFLOW_SESSION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Dataflow_sessionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DATAFLOW_SESSION}/:id`}
              element={
                <ProtectedRoute subject={"DATAFLOW_SESSION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Dataflow_sessionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DIRECTORY_COUNTRY_FORMAT}
 element={ <ProtectedRoute subject={"DIRECTORY_COUNTRY_FORMAT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Directory_country_formatIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DIRECTORY_COUNTRY_FORMAT}/:id`}
              element={
                <ProtectedRoute subject={"DIRECTORY_COUNTRY_FORMAT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Directory_country_formatById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.TAX_CALCULATION}
 element={ <ProtectedRoute subject={"TAX_CALCULATION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Tax_calculationIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.TAX_CALCULATION}/:id`}
              element={
                <ProtectedRoute subject={"TAX_CALCULATION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Tax_calculationById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_URL_REWRITE}
 element={ <ProtectedRoute subject={"CORE_URL_REWRITE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_url_rewriteIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_URL_REWRITE}/:id`}
              element={
                <ProtectedRoute subject={"CORE_URL_REWRITE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_url_rewriteById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_LINK}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_SUPER_LINK_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_super_linkIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_LINK}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_SUPER_LINK_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_super_linkById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.TAX_CALCULATION_RULE}
 element={ <ProtectedRoute subject={"TAX_CALCULATION_RULE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Tax_calculation_ruleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.TAX_CALCULATION_RULE}/:id`}
              element={
                <ProtectedRoute subject={"TAX_CALCULATION_RULE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Tax_calculation_ruleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_LINK}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_linkIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_LINK}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_linkById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.LOG_URL_INFO}
 element={ <ProtectedRoute subject={"LOG_URL_INFO_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Log_url_infoIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.LOG_URL_INFO}/:id`}
              element={
                <ProtectedRoute subject={"LOG_URL_INFO_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Log_url_infoById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.RATING_OPTION_VOTE}
 element={ <ProtectedRoute subject={"RATING_OPTION_VOTE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Rating_option_voteIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.RATING_OPTION_VOTE}/:id`}
              element={
                <ProtectedRoute subject={"RATING_OPTION_VOTE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Rating_option_voteById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.RATING_OPTION_VOTE_AGGREGATED}
 element={ <ProtectedRoute subject={"RATING_OPTION_VOTE_AGGREGATED_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Rating_option_vote_aggregatedIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.RATING_OPTION_VOTE_AGGREGATED}/:id`}
              element={
                <ProtectedRoute subject={"RATING_OPTION_VOTE_AGGREGATED_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Rating_option_vote_aggregatedById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_FLAT_QUOTE_ITEM_OPTION}
 element={ <ProtectedRoute subject={"SALES_FLAT_QUOTE_ITEM_OPTION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_item_optionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_FLAT_QUOTE_ITEM_OPTION}/:id`}
              element={
                <ProtectedRoute subject={"SALES_FLAT_QUOTE_ITEM_OPTION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_item_optionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ENTITY}
 element={ <ProtectedRoute subject={"CUSTOMER_ENTITY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_entityIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ENTITY}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ENTITY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_entityById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_DATETIME}
 element={ <ProtectedRoute subject={"SALES_ORDER_DATETIME_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_datetimeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_DATETIME}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_DATETIME_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_datetimeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.REVIEW_ENTITY_SUMMARY}
 element={ <ProtectedRoute subject={"REVIEW_ENTITY_SUMMARY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Review_entity_summaryIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.REVIEW_ENTITY_SUMMARY}/:id`}
              element={
                <ProtectedRoute subject={"REVIEW_ENTITY_SUMMARY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Review_entity_summaryById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_RESOURCE}
 element={ <ProtectedRoute subject={"CORE_RESOURCE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_resourceIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_RESOURCE}/:id`}
              element={
                <ProtectedRoute subject={"CORE_RESOURCE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_resourceById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_FLAT_QUOTE_ADDRESS_ITEM}
 element={ <ProtectedRoute subject={"SALES_FLAT_QUOTE_ADDRESS_ITEM_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_address_itemIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_FLAT_QUOTE_ADDRESS_ITEM}/:id`}
              element={
                <ProtectedRoute subject={"SALES_FLAT_QUOTE_ADDRESS_ITEM_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_address_itemById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ENTITY_VARCHAR}
 element={ <ProtectedRoute subject={"CUSTOMER_ENTITY_VARCHAR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_entity_varcharIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ENTITY_VARCHAR}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ENTITY_VARCHAR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_entity_varcharById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_DATETIME}
 element={ <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_DATETIME_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_datetimeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_DATETIME}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_DATETIME_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_datetimeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_TEXT}
 element={ <ProtectedRoute subject={"SALES_ORDER_TEXT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_textIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_TEXT}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_TEXT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_textById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ENTITY_INT}
 element={ <ProtectedRoute subject={"CUSTOMER_ENTITY_INT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_entity_intIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ENTITY_INT}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ENTITY_INT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_entity_intById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_super_attribute_labelIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_SUPER_ATTRIBUTE_LABEL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_super_attribute_labelById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_TRANSLATE}
 element={ <ProtectedRoute subject={"CORE_TRANSLATE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_translateIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_TRANSLATE}/:id`}
              element={
                <ProtectedRoute subject={"CORE_TRANSLATE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_translateById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DIRECTORY_COUNTRY_REGION_NAME}
 element={ <ProtectedRoute subject={"DIRECTORY_COUNTRY_REGION_NAME_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Directory_country_region_nameIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DIRECTORY_COUNTRY_REGION_NAME}/:id`}
              element={
                <ProtectedRoute subject={"DIRECTORY_COUNTRY_REGION_NAME_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Directory_country_region_nameById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.TAX_CALCULATION_RATE}
 element={ <ProtectedRoute subject={"TAX_CALCULATION_RATE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Tax_calculation_rateIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.TAX_CALCULATION_RATE}/:id`}
              element={
                <ProtectedRoute subject={"TAX_CALCULATION_RATE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Tax_calculation_rateById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_media_gallery_valueIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_VALUE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_media_gallery_valueById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_COMPARE_ITEM}
 element={ <ProtectedRoute subject={"CATALOG_COMPARE_ITEM_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_compare_itemIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_COMPARE_ITEM}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_COMPARE_ITEM_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_compare_itemById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_media_galleryIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_MEDIA_GALLERY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_media_galleryById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.LOG_SUMMARY_TYPE}
 element={ <ProtectedRoute subject={"LOG_SUMMARY_TYPE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Log_summary_typeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.LOG_SUMMARY_TYPE}/:id`}
              element={
                <ProtectedRoute subject={"LOG_SUMMARY_TYPE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Log_summary_typeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_CATEGORY_PRODUCT}
 element={ <ProtectedRoute subject={"CATALOG_CATEGORY_PRODUCT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_category_productIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_CATEGORY_PRODUCT}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_CATEGORY_PRODUCT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_category_productById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_optionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_optionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.LOG_VISITOR}
 element={ <ProtectedRoute subject={"LOG_VISITOR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Log_visitorIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.LOG_VISITOR}/:id`}
              element={
                <ProtectedRoute subject={"LOG_VISITOR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Log_visitorById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_FLAT_ORDER_ITEM}
 element={ <ProtectedRoute subject={"SALES_FLAT_ORDER_ITEM_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_flat_order_itemIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_FLAT_ORDER_ITEM}/:id`}
              element={
                <ProtectedRoute subject={"SALES_FLAT_ORDER_ITEM_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_flat_order_itemById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGINDEX_EAV}
 element={ <ProtectedRoute subject={"CATALOGINDEX_EAV_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalogindex_eavIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGINDEX_EAV}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGINDEX_EAV_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalogindex_eavById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.PAYGATE_AUTHORIZENET_DEBUG}
 element={ <ProtectedRoute subject={"PAYGATE_AUTHORIZENET_DEBUG_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Paygate_authorizenet_debugIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.PAYGATE_AUTHORIZENET_DEBUG}/:id`}
              element={
                <ProtectedRoute subject={"PAYGATE_AUTHORIZENET_DEBUG_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Paygate_authorizenet_debugById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.REPORT_EVENT}
 element={ <ProtectedRoute subject={"REPORT_EVENT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Report_eventIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.REPORT_EVENT}/:id`}
              element={
                <ProtectedRoute subject={"REPORT_EVENT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Report_eventById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGSEARCH_QUERY}
 element={ <ProtectedRoute subject={"CATALOGSEARCH_QUERY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalogsearch_queryIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGSEARCH_QUERY}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGSEARCH_QUERY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalogsearch_queryById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.LOG_CUSTOMER}
 element={ <ProtectedRoute subject={"LOG_CUSTOMER_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Log_customerIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.LOG_CUSTOMER}/:id`}
              element={
                <ProtectedRoute subject={"LOG_CUSTOMER_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Log_customerById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_ENTITY_TEXT}
 element={ <ProtectedRoute subject={"SALES_ORDER_ENTITY_TEXT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_textIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_ENTITY_TEXT}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_ENTITY_TEXT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_textById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_VARCHAR}
 element={ <ProtectedRoute subject={"SALES_ORDER_VARCHAR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_varcharIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_VARCHAR}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_VARCHAR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_varcharById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_CATEGORY_PRODUCT_INDEX}
 element={ <ProtectedRoute subject={"CATALOG_CATEGORY_PRODUCT_INDEX_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_category_product_indexIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_CATEGORY_PRODUCT_INDEX}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_CATEGORY_PRODUCT_INDEX_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_category_product_indexById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ATTRIBUTE_OPTION_VALUE}
 element={ <ProtectedRoute subject={"EAV_ATTRIBUTE_OPTION_VALUE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_attribute_option_valueIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ATTRIBUTE_OPTION_VALUE}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ATTRIBUTE_OPTION_VALUE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_attribute_option_valueById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.REVIEW_STATUS}
 element={ <ProtectedRoute subject={"REVIEW_STATUS_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Review_statusIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.REVIEW_STATUS}/:id`}
              element={
                <ProtectedRoute subject={"REVIEW_STATUS_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Review_statusById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_VARCHAR}
 element={ <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_VARCHAR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_varcharIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_VARCHAR}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_VARCHAR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_varcharById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_FLAT_QUOTE_SHIPPING_RATE}
 element={ <ProtectedRoute subject={"SALES_FLAT_QUOTE_SHIPPING_RATE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_shipping_rateIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_FLAT_QUOTE_SHIPPING_RATE}/:id`}
              element={
                <ProtectedRoute subject={"SALES_FLAT_QUOTE_SHIPPING_RATE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_shipping_rateById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY}
 element={ <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_category_entityIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_category_entityById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CMS_BLOCK}
 element={ <ProtectedRoute subject={"CMS_BLOCK_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Cms_blockIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CMS_BLOCK}/:id`}
              element={
                <ProtectedRoute subject={"CMS_BLOCK_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Cms_blockById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGINVENTORY_STOCK_ITEM}
 element={ <ProtectedRoute subject={"CATALOGINVENTORY_STOCK_ITEM_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Cataloginventory_stock_itemIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGINVENTORY_STOCK_ITEM}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGINVENTORY_STOCK_ITEM_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Cataloginventory_stock_itemById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.ADMINNOTIFICATION_INBOX}
 element={ <ProtectedRoute subject={"ADMINNOTIFICATION_INBOX_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Adminnotification_inboxIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.ADMINNOTIFICATION_INBOX}/:id`}
              element={
                <ProtectedRoute subject={"ADMINNOTIFICATION_INBOX_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Adminnotification_inboxById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CRON_SCHEDULE}
 element={ <ProtectedRoute subject={"CRON_SCHEDULE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Cron_scheduleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CRON_SCHEDULE}/:id`}
              element={
                <ProtectedRoute subject={"CRON_SCHEDULE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Cron_scheduleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.ADMIN_ROLE}
 element={ <ProtectedRoute subject={"ADMIN_ROLE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Admin_roleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.ADMIN_ROLE}/:id`}
              element={
                <ProtectedRoute subject={"ADMIN_ROLE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Admin_roleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_ENTITY}
 element={ <ProtectedRoute subject={"SALES_ORDER_ENTITY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_entityIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_ENTITY}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_ENTITY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_entityById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_DECIMAL}
 element={ <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_DECIMAL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_decimalIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_DECIMAL}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_DECIMAL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_decimalById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.PRODUCT_ALERT_PRICE}
 element={ <ProtectedRoute subject={"PRODUCT_ALERT_PRICE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Product_alert_priceIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.PRODUCT_ALERT_PRICE}/:id`}
              element={
                <ProtectedRoute subject={"PRODUCT_ALERT_PRICE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Product_alert_priceById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_TAX}
 element={ <ProtectedRoute subject={"SALES_ORDER_TAX_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_taxIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_TAX}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_TAX_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_taxById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.REVIEW_DETAIL}
 element={ <ProtectedRoute subject={"REVIEW_DETAIL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Review_detailIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.REVIEW_DETAIL}/:id`}
              element={
                <ProtectedRoute subject={"REVIEW_DETAIL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Review_detailById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_FLAT_QUOTE_ADDRESS}
 element={ <ProtectedRoute subject={"SALES_FLAT_QUOTE_ADDRESS_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_addressIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_FLAT_QUOTE_ADDRESS}/:id`}
              element={
                <ProtectedRoute subject={"SALES_FLAT_QUOTE_ADDRESS_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_flat_quote_addressById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DATAFLOW_IMPORT_DATA}
 element={ <ProtectedRoute subject={"DATAFLOW_IMPORT_DATA_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Dataflow_import_dataIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DATAFLOW_IMPORT_DATA}/:id`}
              element={
                <ProtectedRoute subject={"DATAFLOW_IMPORT_DATA_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Dataflow_import_dataById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_ATTRIBUTE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_attributeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_ATTRIBUTE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_attributeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TITLE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_TITLE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_titleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TITLE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_TITLE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_titleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.LOG_QUOTE}
 element={ <ProtectedRoute subject={"LOG_QUOTE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Log_quoteIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.LOG_QUOTE}/:id`}
              element={
                <ProtectedRoute subject={"LOG_QUOTE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Log_quoteById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_OPTION}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_BUNDLE_OPTION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_bundle_optionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_OPTION}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_BUNDLE_OPTION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_bundle_optionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.TAX_CALCULATION_RATE_TITLE}
 element={ <ProtectedRoute subject={"TAX_CALCULATION_RATE_TITLE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Tax_calculation_rate_titleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.TAX_CALCULATION_RATE_TITLE}/:id`}
              element={
                <ProtectedRoute subject={"TAX_CALCULATION_RATE_TITLE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Tax_calculation_rate_titleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.PAYPAL_API_DEBUG}
 element={ <ProtectedRoute subject={"PAYPAL_API_DEBUG_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Paypal_api_debugIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.PAYPAL_API_DEBUG}/:id`}
              element={
                <ProtectedRoute subject={"PAYPAL_API_DEBUG_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Paypal_api_debugById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.API_USER}
 element={ <ProtectedRoute subject={"API_USER_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Api_userIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.API_USER}/:id`}
              element={
                <ProtectedRoute subject={"API_USER_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Api_userById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DATAFLOW_BATCH_EXPORT}
 element={ <ProtectedRoute subject={"DATAFLOW_BATCH_EXPORT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Dataflow_batch_exportIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DATAFLOW_BATCH_EXPORT}/:id`}
              element={
                <ProtectedRoute subject={"DATAFLOW_BATCH_EXPORT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Dataflow_batch_exportById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ATTRIBUTE_SET}
 element={ <ProtectedRoute subject={"EAV_ATTRIBUTE_SET_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_attribute_setIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ATTRIBUTE_SET}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ATTRIBUTE_SET_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_attribute_setById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.NEWSLETTER_QUEUE_STORE_LINK}
 element={ <ProtectedRoute subject={"NEWSLETTER_QUEUE_STORE_LINK_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Newsletter_queue_store_linkIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.NEWSLETTER_QUEUE_STORE_LINK}/:id`}
              element={
                <ProtectedRoute subject={"NEWSLETTER_QUEUE_STORE_LINK_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Newsletter_queue_store_linkById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER}
 element={ <ProtectedRoute subject={"SALES_ORDER_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_orderIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_orderById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_DECIMAL}
 element={ <ProtectedRoute subject={"SALES_ORDER_DECIMAL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_decimalIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_DECIMAL}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_DECIMAL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_decimalById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.PRODUCT_ALERT_STOCK}
 element={ <ProtectedRoute subject={"PRODUCT_ALERT_STOCK_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Product_alert_stockIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.PRODUCT_ALERT_STOCK}/:id`}
              element={
                <ProtectedRoute subject={"PRODUCT_ALERT_STOCK_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Product_alert_stockById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_VALUE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_TYPE_VALUE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_type_valueIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_VALUE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_TYPE_VALUE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_type_valueById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CMS_BLOCK_STORE}
 element={ <ProtectedRoute subject={"CMS_BLOCK_STORE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Cms_block_storeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CMS_BLOCK_STORE}/:id`}
              element={
                <ProtectedRoute subject={"CMS_BLOCK_STORE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Cms_block_storeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ATTRIBUTE}
 element={ <ProtectedRoute subject={"EAV_ATTRIBUTE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_attributeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ATTRIBUTE}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ATTRIBUTE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_attributeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ENTITY_DATETIME}
 element={ <ProtectedRoute subject={"CUSTOMER_ENTITY_DATETIME_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_entity_datetimeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ENTITY_DATETIME}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ENTITY_DATETIME_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_entity_datetimeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_SESSION}
 element={ <ProtectedRoute subject={"CORE_SESSION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_sessionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_SESSION}/:id`}
              element={
                <ProtectedRoute subject={"CORE_SESSION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_sessionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.WISHLIST}
 element={ <ProtectedRoute subject={"WISHLIST_READ"}>
<Suspense fallback={<PageLoader />}>
                    <WishlistIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.WISHLIST}/:id`}
              element={
                <ProtectedRoute subject={"WISHLIST_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <WishlistById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_TEXT}
 element={ <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_TEXT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_textIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_TEXT}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_TEXT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_textById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ENTITY_DECIMAL}
 element={ <ProtectedRoute subject={"CUSTOMER_ENTITY_DECIMAL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_entity_decimalIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ENTITY_DECIMAL}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ENTITY_DECIMAL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_entity_decimalById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_TIER_PRICE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_TIER_PRICE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_tier_priceIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_TIER_PRICE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_TIER_PRICE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_tier_priceById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.RATING}
 element={ <ProtectedRoute subject={"RATING_READ"}>
<Suspense fallback={<PageLoader />}>
                    <RatingIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.RATING}/:id`}
              element={
                <ProtectedRoute subject={"RATING_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <RatingById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.POLL}
 element={ <ProtectedRoute subject={"POLL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <PollIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.POLL}/:id`}
              element={
                <ProtectedRoute subject={"POLL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <PollById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CHECKOUT_AGREEMENT_STORE}
 element={ <ProtectedRoute subject={"CHECKOUT_AGREEMENT_STORE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Checkout_agreement_storeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CHECKOUT_AGREEMENT_STORE}/:id`}
              element={
                <ProtectedRoute subject={"CHECKOUT_AGREEMENT_STORE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Checkout_agreement_storeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_attribute_decimalIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_ATTRIBUTE_DECIMAL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_attribute_decimalById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGRULE}
 element={ <ProtectedRoute subject={"CATALOGRULE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <CatalogruleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGRULE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGRULE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <CatalogruleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_STORE}
 element={ <ProtectedRoute subject={"CORE_STORE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_storeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_STORE}/:id`}
              element={
                <ProtectedRoute subject={"CORE_STORE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_storeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_SELECTION}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_BUNDLE_SELECTION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_bundle_selectionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_SELECTION}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_BUNDLE_SELECTION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_bundle_selectionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_INT}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_INT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_intIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_INT}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_INT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_intById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.LOG_URL}
 element={ <ProtectedRoute subject={"LOG_URL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Log_urlIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.LOG_URL}/:id`}
              element={
                <ProtectedRoute subject={"LOG_URL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Log_urlById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_EMAIL_TEMPLATE}
 element={ <ProtectedRoute subject={"CORE_EMAIL_TEMPLATE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_email_templateIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_EMAIL_TEMPLATE}/:id`}
              element={
                <ProtectedRoute subject={"CORE_EMAIL_TEMPLATE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_email_templateById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.RATING_STORE}
 element={ <ProtectedRoute subject={"RATING_STORE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Rating_storeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.RATING_STORE}/:id`}
              element={
                <ProtectedRoute subject={"RATING_STORE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Rating_storeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.NEWSLETTER_QUEUE}
 element={ <ProtectedRoute subject={"NEWSLETTER_QUEUE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Newsletter_queueIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.NEWSLETTER_QUEUE}/:id`}
              element={
                <ProtectedRoute subject={"NEWSLETTER_QUEUE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Newsletter_queueById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.TAG}
 element={ <ProtectedRoute subject={"TAG_READ"}>
<Suspense fallback={<PageLoader />}>
                    <TagIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.TAG}/:id`}
              element={
                <ProtectedRoute subject={"TAG_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <TagById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_INT}
 element={ <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_INT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_intIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_INT}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_INT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_intById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SITEMAP}
 element={ <ProtectedRoute subject={"SITEMAP_READ"}>
<Suspense fallback={<PageLoader />}>
                    <SitemapIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SITEMAP}/:id`}
              element={
                <ProtectedRoute subject={"SITEMAP_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <SitemapById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_LAYOUT_LINK}
 element={ <ProtectedRoute subject={"CORE_LAYOUT_LINK_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_layout_linkIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_LAYOUT_LINK}/:id`}
              element={
                <ProtectedRoute subject={"CORE_LAYOUT_LINK_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_layout_linkById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entityIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entityById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_WEBSITE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_WEBSITE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_websiteIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_WEBSITE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_WEBSITE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_websiteById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_FLAT_QUOTE}
 element={ <ProtectedRoute subject={"SALES_FLAT_QUOTE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_flat_quoteIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_FLAT_QUOTE}/:id`}
              element={
                <ProtectedRoute subject={"SALES_FLAT_QUOTE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_flat_quoteById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.API_RULE}
 element={ <ProtectedRoute subject={"API_RULE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Api_ruleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.API_RULE}/:id`}
              element={
                <ProtectedRoute subject={"API_RULE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Api_ruleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENABLED_INDEX}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENABLED_INDEX_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_enabled_indexIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENABLED_INDEX}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENABLED_INDEX_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_enabled_indexById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DIRECTORY_COUNTRY}
 element={ <ProtectedRoute subject={"DIRECTORY_COUNTRY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Directory_countryIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DIRECTORY_COUNTRY}/:id`}
              element={
                <ProtectedRoute subject={"DIRECTORY_COUNTRY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Directory_countryById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY}
 element={ <ProtectedRoute subject={"EAV_ENTITY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entityIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entityById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_INT}
 element={ <ProtectedRoute subject={"SALES_ORDER_INT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_intIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_INT}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_INT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_intById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGINDEX_MINIMAL_PRICE}
 element={ <ProtectedRoute subject={"CATALOGINDEX_MINIMAL_PRICE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalogindex_minimal_priceIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGINDEX_MINIMAL_PRICE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGINDEX_MINIMAL_PRICE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalogindex_minimal_priceById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.API_ASSERT}
 element={ <ProtectedRoute subject={"API_ASSERT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Api_assertIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.API_ASSERT}/:id`}
              element={
                <ProtectedRoute subject={"API_ASSERT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Api_assertById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY_DECIMAL}
 element={ <ProtectedRoute subject={"EAV_ENTITY_DECIMAL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entity_decimalIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY_DECIMAL}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_DECIMAL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entity_decimalById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.RATING_ENTITY}
 element={ <ProtectedRoute subject={"RATING_ENTITY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Rating_entityIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.RATING_ENTITY}/:id`}
              element={
                <ProtectedRoute subject={"RATING_ENTITY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Rating_entityById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_INT}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_ATTRIBUTE_INT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_attribute_intIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_INT}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_ATTRIBUTE_INT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_attribute_intById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_STORE_GROUP}
 element={ <ProtectedRoute subject={"CORE_STORE_GROUP_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_store_groupIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_STORE_GROUP}/:id`}
              element={
                <ProtectedRoute subject={"CORE_STORE_GROUP_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_store_groupById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_GROUP}
 element={ <ProtectedRoute subject={"CUSTOMER_GROUP_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_groupIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_GROUP}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_GROUP_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_groupById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CMS_PAGE_STORE}
 element={ <ProtectedRoute subject={"CMS_PAGE_STORE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Cms_page_storeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CMS_PAGE_STORE}/:id`}
              element={
                <ProtectedRoute subject={"CMS_PAGE_STORE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Cms_page_storeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRICING}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRICING_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_super_attribute_pricingIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRICING}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_SUPER_ATTRIBUTE_PRICING_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_super_attribute_pricingById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.ADMIN_USER}
 element={ <ProtectedRoute subject={"ADMIN_USER_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Admin_userIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.ADMIN_USER}/:id`}
              element={
                <ProtectedRoute subject={"ADMIN_USER_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Admin_userById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_DECIMAL}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_DECIMAL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_decimalIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_DECIMAL}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_DECIMAL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_decimalById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.POLL_ANSWER}
 element={ <ProtectedRoute subject={"POLL_ANSWER_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Poll_answerIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.POLL_ANSWER}/:id`}
              element={
                <ProtectedRoute subject={"POLL_ANSWER_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Poll_answerById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_OPTION_VALUE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_BUNDLE_OPTION_VALUE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_bundle_option_valueIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_BUNDLE_OPTION_VALUE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_BUNDLE_OPTION_VALUE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_bundle_option_valueById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_PRICE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_PRICE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_priceIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_PRICE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_PRICE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_priceById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CHECKOUT_AGREEMENT}
 element={ <ProtectedRoute subject={"CHECKOUT_AGREEMENT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Checkout_agreementIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CHECKOUT_AGREEMENT}/:id`}
              element={
                <ProtectedRoute subject={"CHECKOUT_AGREEMENT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Checkout_agreementById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.NEWSLETTER_SUBSCRIBER}
 element={ <ProtectedRoute subject={"NEWSLETTER_SUBSCRIBER_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Newsletter_subscriberIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.NEWSLETTER_SUBSCRIBER}/:id`}
              element={
                <ProtectedRoute subject={"NEWSLETTER_SUBSCRIBER_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Newsletter_subscriberById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_DECIMAL}
 element={ <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_DECIMAL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_decimalIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_DECIMAL}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_DECIMAL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_decimalById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_ENTITY_VARCHAR}
 element={ <ProtectedRoute subject={"SALES_ORDER_ENTITY_VARCHAR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_varcharIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_ENTITY_VARCHAR}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_ENTITY_VARCHAR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_varcharById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_SUPER_ATTRIBUTE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_super_attributeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_SUPER_ATTRIBUTE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_SUPER_ATTRIBUTE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_super_attributeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_INT}
 element={ <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_INT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_intIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_INT}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_INT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_intById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGINDEX_PRICE}
 element={ <ProtectedRoute subject={"CATALOGINDEX_PRICE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalogindex_priceIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGINDEX_PRICE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGINDEX_PRICE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalogindex_priceById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGRULE_PRODUCT}
 element={ <ProtectedRoute subject={"CATALOGRULE_PRODUCT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalogrule_productIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGRULE_PRODUCT}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGRULE_PRODUCT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalogrule_productById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOGRULE_PRODUCT_PRICE}
 element={ <ProtectedRoute subject={"CATALOGRULE_PRODUCT_PRICE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalogrule_product_priceIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOGRULE_PRODUCT_PRICE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOGRULE_PRODUCT_PRICE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalogrule_product_priceById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY_VARCHAR}
 element={ <ProtectedRoute subject={"EAV_ENTITY_VARCHAR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entity_varcharIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY_VARCHAR}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_VARCHAR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entity_varcharById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.TAG_SUMMARY}
 element={ <ProtectedRoute subject={"TAG_SUMMARY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Tag_summaryIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.TAG_SUMMARY}/:id`}
              element={
                <ProtectedRoute subject={"TAG_SUMMARY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Tag_summaryById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.API_ROLE}
 element={ <ProtectedRoute subject={"API_ROLE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Api_roleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.API_ROLE}/:id`}
              element={
                <ProtectedRoute subject={"API_ROLE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Api_roleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.REPORT_EVENT_TYPES}
 element={ <ProtectedRoute subject={"REPORT_EVENT_TYPES_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Report_event_typesIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.REPORT_EVENT_TYPES}/:id`}
              element={
                <ProtectedRoute subject={"REPORT_EVENT_TYPES_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Report_event_typesById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_GALLERY}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_GALLERY_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_galleryIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_GALLERY}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_GALLERY_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_galleryById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_DATETIME}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_DATETIME_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_datetimeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_ENTITY_DATETIME}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_ENTITY_DATETIME_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_entity_datetimeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_VARCHAR}
 element={ <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_VARCHAR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_varcharIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ADDRESS_ENTITY_VARCHAR}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ADDRESS_ENTITY_VARCHAR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_address_entity_varcharById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_ENTITY_DATETIME}
 element={ <ProtectedRoute subject={"SALES_ORDER_ENTITY_DATETIME_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_datetimeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_ENTITY_DATETIME}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_ENTITY_DATETIME_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_datetimeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.PAYPALUK_API_DEBUG}
 element={ <ProtectedRoute subject={"PAYPALUK_API_DEBUG_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Paypaluk_api_debugIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.PAYPALUK_API_DEBUG}/:id`}
              element={
                <ProtectedRoute subject={"PAYPALUK_API_DEBUG_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Paypaluk_api_debugById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY_DATETIME}
 element={ <ProtectedRoute subject={"EAV_ENTITY_DATETIME_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entity_datetimeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY_DATETIME}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_DATETIME_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entity_datetimeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DESIGN_CHANGE}
 element={ <ProtectedRoute subject={"DESIGN_CHANGE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Design_changeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DESIGN_CHANGE}/:id`}
              element={
                <ProtectedRoute subject={"DESIGN_CHANGE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Design_changeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY_TYPE}
 element={ <ProtectedRoute subject={"EAV_ENTITY_TYPE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entity_typeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY_TYPE}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_TYPE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entity_typeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_WEBSITE}
 element={ <ProtectedRoute subject={"CORE_WEBSITE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_websiteIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_WEBSITE}/:id`}
              element={
                <ProtectedRoute subject={"CORE_WEBSITE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_websiteById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CUSTOMER_ENTITY_TEXT}
 element={ <ProtectedRoute subject={"CUSTOMER_ENTITY_TEXT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Customer_entity_textIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CUSTOMER_ENTITY_TEXT}/:id`}
              element={
                <ProtectedRoute subject={"CUSTOMER_ENTITY_TEXT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Customer_entity_textById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY_ATTRIBUTE}
 element={ <ProtectedRoute subject={"EAV_ENTITY_ATTRIBUTE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entity_attributeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY_ATTRIBUTE}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_ATTRIBUTE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entity_attributeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SENDFRIEND_LOG}
 element={ <ProtectedRoute subject={"SENDFRIEND_LOG_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sendfriend_logIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SENDFRIEND_LOG}/:id`}
              element={
                <ProtectedRoute subject={"SENDFRIEND_LOG_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sendfriend_logById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.TAX_CLASS}
 element={ <ProtectedRoute subject={"TAX_CLASS_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Tax_classIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.TAX_CLASS}/:id`}
              element={
                <ProtectedRoute subject={"TAX_CLASS_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Tax_classById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_TYPE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_TYPE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_typeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_TYPE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_TYPE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_typeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_PRICE}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_TYPE_PRICE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_type_priceIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_OPTION_TYPE_PRICE}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_OPTION_TYPE_PRICE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_option_type_priceById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.LOG_VISITOR_INFO}
 element={ <ProtectedRoute subject={"LOG_VISITOR_INFO_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Log_visitor_infoIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.LOG_VISITOR_INFO}/:id`}
              element={
                <ProtectedRoute subject={"LOG_VISITOR_INFO_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Log_visitor_infoById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.ADMIN_RULE}
 element={ <ProtectedRoute subject={"ADMIN_RULE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Admin_ruleIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.ADMIN_RULE}/:id`}
              element={
                <ProtectedRoute subject={"ADMIN_RULE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Admin_ruleById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.RATING_OPTION}
 element={ <ProtectedRoute subject={"RATING_OPTION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Rating_optionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.RATING_OPTION}/:id`}
              element={
                <ProtectedRoute subject={"RATING_OPTION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Rating_optionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_DATETIME}
 element={ <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_DATETIME_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_datetimeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_CATEGORY_ENTITY_DATETIME}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_CATEGORY_ENTITY_DATETIME_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_category_entity_datetimeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY_TEXT}
 element={ <ProtectedRoute subject={"EAV_ENTITY_TEXT_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entity_textIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY_TEXT}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_TEXT_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entity_textById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CORE_LAYOUT_UPDATE}
 element={ <ProtectedRoute subject={"CORE_LAYOUT_UPDATE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Core_layout_updateIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CORE_LAYOUT_UPDATE}/:id`}
              element={
                <ProtectedRoute subject={"CORE_LAYOUT_UPDATE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Core_layout_updateById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ENTITY_STORE}
 element={ <ProtectedRoute subject={"EAV_ENTITY_STORE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_entity_storeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ENTITY_STORE}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ENTITY_STORE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_entity_storeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.POLL_STORE}
 element={ <ProtectedRoute subject={"POLL_STORE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Poll_storeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.POLL_STORE}/:id`}
              element={
                <ProtectedRoute subject={"POLL_STORE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Poll_storeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR}
 element={ <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_attribute_varcharIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR}/:id`}
              element={
                <ProtectedRoute subject={"CATALOG_PRODUCT_LINK_ATTRIBUTE_VARCHAR_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Catalog_product_link_attribute_varcharById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.SALES_ORDER_ENTITY_DECIMAL}
 element={ <ProtectedRoute subject={"SALES_ORDER_ENTITY_DECIMAL_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_decimalIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.SALES_ORDER_ENTITY_DECIMAL}/:id`}
              element={
                <ProtectedRoute subject={"SALES_ORDER_ENTITY_DECIMAL_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Sales_order_entity_decimalById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.EAV_ATTRIBUTE_OPTION}
 element={ <ProtectedRoute subject={"EAV_ATTRIBUTE_OPTION_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Eav_attribute_optionIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.EAV_ATTRIBUTE_OPTION}/:id`}
              element={
                <ProtectedRoute subject={"EAV_ATTRIBUTE_OPTION_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Eav_attribute_optionById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.DATAFLOW_BATCH}
 element={ <ProtectedRoute subject={"DATAFLOW_BATCH_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Dataflow_batchIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.DATAFLOW_BATCH}/:id`}
              element={
                <ProtectedRoute subject={"DATAFLOW_BATCH_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Dataflow_batchById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.GIFT_MESSAGE}
 element={ <ProtectedRoute subject={"GIFT_MESSAGE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Gift_messageIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.GIFT_MESSAGE}/:id`}
              element={
                <ProtectedRoute subject={"GIFT_MESSAGE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Gift_messageById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.NEWSLETTER_TEMPLATE}
 element={ <ProtectedRoute subject={"NEWSLETTER_TEMPLATE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Newsletter_templateIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.NEWSLETTER_TEMPLATE}/:id`}
              element={
                <ProtectedRoute subject={"NEWSLETTER_TEMPLATE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Newsletter_templateById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.REVIEW_STORE}
 element={ <ProtectedRoute subject={"REVIEW_STORE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <Review_storeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.REVIEW_STORE}/:id`}
              element={
                <ProtectedRoute subject={"REVIEW_STORE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <Review_storeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path={APPLICATION_ROUTES.SYSTEM_USERS}
              element={
                <ProtectedRoute subject={"SYSTEM_USERS"} onlyForSuperUser={true}>
                  <Suspense fallback={<PageLoader />}>
                    <IndexSystemUsers />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route path={APPLICATION_ROUTES.LOGOUT} element={<LogOutUserComponent />} />
            <Route path="/forbiden" element={<LogOutUserComponent />} />

            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
};

const LogOutUserComponent: FC = () => {
  const { logout } = useUser();
  logout();
  return <Navigate to={APPLICATION_ROUTES.LOGIN} />;
};

export default PrivateRouter;
