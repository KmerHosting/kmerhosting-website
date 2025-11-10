<!doctype html>
<html lang="en">
<head>
    <meta charset="{$charset}" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{if $kbarticle.title}{$kbarticle.title} - {/if}{$pagetitle} - {$companyname}</title>
    
    {* CSS Personnalisés KmerHosting *}
    <link href="{$WEB_ROOT}/templates/{$template}/assets/css/kmerhosting-variables.css" rel="stylesheet">
    <link href="{$WEB_ROOT}/templates/{$template}/assets/css/kmerhosting-custom.css" rel="stylesheet">
    
    {include file="$template/includes/head.tpl"}
    {$headoutput}
</head>
<body class="primary-bg-color kmerhosting-theme" data-phone-cc-input="{$phoneNumberInputStyle}">
    {if $captcha}{$captcha->getMarkup()}{/if}
    {$headeroutput}

    {* Header KmerHosting Style *}
    <header id="header" class="header kmer-header">
        {* Top Bar pour utilisateurs connectés *}
        {if $loggedin}
            <div class="topbar" style="background: var(--kmer-bg-secondary); border-bottom: 1px solid var(--kmer-border); padding: 0.5rem 0;">
                <div class="container">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <button type="button" class="btn btn-sm" data-toggle="popover" id="accountNotifications" data-placement="bottom" style="color: var(--kmer-text);">
                                <i class="far fa-bell"></i>
                                {if count($clientAlerts) > 0}
                                    <span class="badge badge-danger ml-1">{count($clientAlerts)}</span>
                                {else}
                                    <span class="d-none d-sm-inline ml-1">{lang key='nonotifications'}</span>
                                {/if}
                            </button>
                            <div id="accountNotificationsContent" class="w-hidden">
                                <ul class="client-alerts">
                                {foreach $clientAlerts as $alert}
                                    <li>
                                        <a href="{$alert->getLink()}">
                                            <i class="fas fa-fw fa-{if $alert->getSeverity() == 'danger'}exclamation-circle{elseif $alert->getSeverity() == 'warning'}exclamation-triangle{elseif $alert->getSeverity() == 'info'}info-circle{else}check-circle{/if}"></i>
                                            <div class="message">{$alert->getMessage()}</div>
                                        </a>
                                    </li>
                                {foreachelse}
                                    <li class="none">
                                        {lang key='notificationsnone'}
                                    </li>
                                {/foreach}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div class="d-flex align-items-center">
                                <span class="d-none d-md-inline mr-2" style="color: var(--kmer-text-secondary); font-size: 0.875rem;">
                                    {lang key='loggedInAs'}:
                                </span>
                                <a href="{$WEB_ROOT}/clientarea.php?action=details" class="btn btn-sm btn-outline-primary">
                                    {if $client.companyname}
                                        {$client.companyname}
                                    {else}
                                        {$client.fullName}
                                    {/if}
                                </a>
                                {if $adminMasqueradingAsClient || $adminLoggedIn}
                                    <a href="{$WEB_ROOT}/logout.php?returntoadmin=1" class="btn btn-sm btn-warning ml-2" data-toggle="tooltip" title="{lang key="admin.returnToAdmin"}">
                                        <i class="fas fa-redo-alt"></i>
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        {* Navbar Principal - Style KmerHosting *}
        <nav class="navbar navbar-expand-lg navbar-light sticky-top" style="background: var(--kmer-bg); border-bottom: 1px solid var(--kmer-border); box-shadow: var(--kmer-shadow-sm);">
            <div class="container">
                {* Logo *}
                <a class="navbar-brand" href="{$WEB_ROOT}/index.php">
                    {if $assetLogoPath}
                        <img src="{$assetLogoPath}" alt="{$companyname}" style="height: 32px; width: auto;">
                    {else}
                        <span style="font-size: 1.5rem; font-weight: 700; color: var(--kmer-primary);">{$companyname}</span>
                    {/if}
                </a>

                {* Menu Toggle Mobile *}
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                {* Navigation *}
                <div class="collapse navbar-collapse" id="mainNavbar">
                    {* Menu Principal *}
                    <ul class="navbar-nav mx-auto">
                        {include file="$template/includes/navbar.tpl" navbar=$primaryNavbar}
                    </ul>

                    {* Actions à droite *}
                    <ul class="navbar-nav ml-auto align-items-center">
                        {* Panier *}
                        <li class="nav-item">
                            <a class="nav-link position-relative" href="{$WEB_ROOT}/cart.php?a=view" style="color: var(--kmer-text);">
                                <i class="far fa-shopping-cart"></i>
                                {if $cartitemcount > 0}
                                    <span class="badge badge-primary position-absolute" style="top: 0; right: -5px; font-size: 0.65rem;">{$cartitemcount}</span>
                                {/if}
                                <span class="sr-only">{lang key="carttitle"}</span>
                            </a>
                        </li>

                        {* Compte Utilisateur *}
                        {if !$loggedin}
                            <li class="nav-item ml-2">
                                <a href="{$WEB_ROOT}/clientarea.php" class="btn btn-primary">
                                    {lang key="login"}
                                </a>
                            </li>
                        {else}
                            {* Menu Utilisateur *}
                            <li class="nav-item dropdown ml-2">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: var(--kmer-text);">
                                    <i class="far fa-user-circle"></i>
                                </a>
                                {include file="$template/includes/navbar.tpl" navbar=$secondaryNavbar rightDrop=true}
                            </li>
                        {/if}
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    {include file="$template/includes/network-issues-notifications.tpl"}

    {* Breadcrumb *}
    {if $breadcrumb}
        <nav class="master-breadcrumb" aria-label="breadcrumb" style="background: var(--kmer-bg-secondary); padding: 0.75rem 0; border-bottom: 1px solid var(--kmer-border);">
            <div class="container">
                {include file="$template/includes/breadcrumb.tpl"}
            </div>
        </nav>
    {/if}

    {include file="$template/includes/validateuser.tpl"}
    {include file="$template/includes/verifyemail.tpl"}

    {* Domain Search pour Homepage *}
    {if $templatefile == 'homepage'}
        {if $registerdomainenabled || $transferdomainenabled}
            {include file="$template/includes/domain-search.tpl"}
        {/if}
    {/if}

    {* Main Body *}
    <section id="main-body" style="min-height: 60vh; padding: 2rem 0;">
        <div class="{if !$skipMainBodyContainer}container{/if}">
            <div class="row">
                {* Sidebar *}
                {if !$inShoppingCart && ($primarySidebar->hasChildren() || $secondarySidebar->hasChildren())}
                    <div class="col-lg-3">
                        <div class="sidebar">
                            {include file="$template/includes/sidebar.tpl" sidebar=$primarySidebar}
                        </div>
                        {if !$inShoppingCart && $secondarySidebar->hasChildren()}
                            <div class="d-none d-lg-block sidebar mt-4">
                                {include file="$template/includes/sidebar.tpl" sidebar=$secondarySidebar}
                            </div>
                        {/if}
                    </div>
                {/if}
                
                {* Content Principal *}
                <div class="{if !$inShoppingCart && ($primarySidebar->hasChildren() || $secondarySidebar->hasChildren())}col-lg-9{else}col-12{/if} primary-content">
