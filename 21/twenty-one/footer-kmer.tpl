                    </div>
                </div>

                {* Sidebar Secondaire sur Mobile *}
                {if !$inShoppingCart && $secondarySidebar->hasChildren()}
                    <div class="d-lg-none sidebar sidebar-secondary mt-4">
                        {include file="$template/includes/sidebar.tpl" sidebar=$secondarySidebar}
                    </div>
                {/if}
                <div class="clearfix"></div>
            </div>
        </div>
    </section>

    {* Footer KmerHosting Style *}
    <footer id="footer" class="footer" style="background: var(--kmer-bg-secondary); border-top: 1px solid var(--kmer-border); padding: 4rem 0 2rem; margin-top: 4rem;">
        <div class="container">
            <div class="row mb-5">
                {* Colonne 1 - À Propos *}
                <div class="col-md-3 mb-4 mb-md-0">
                    <h4 style="color: var(--kmer-primary); font-weight: 700; margin-bottom: 1rem;">
                        {$companyname}
                    </h4>
                    <p style="color: var(--kmer-text-secondary); font-size: 0.9rem;">
                        Reliable web hosting solutions for Cameroon businesses and individuals. Powered by cPanel & DirectAdmin.
                    </p>
                    
                    {* Social Media *}
                    <div class="mt-3">
                        {include file="$template/includes/social-accounts.tpl"}
                    </div>
                </div>

                {* Colonne 2 - Hébergement *}
                <div class="col-md-3 mb-4 mb-md-0">
                    <h5 style="color: var(--kmer-text); font-weight: 600; margin-bottom: 1rem;">
                        {lang key="orderForm.hosting"}
                    </h5>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="{$WEB_ROOT}/cart.php?gid=1" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;">
                                Shared Hosting
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="{$WEB_ROOT}/cart.php?gid=2" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;">
                                Reseller Hosting
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="{$WEB_ROOT}/cart.php" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;">
                                cPanel Plans
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="{$WEB_ROOT}/cart.php" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;">
                                DirectAdmin Plans
                            </a>
                        </li>
                    </ul>
                </div>

                {* Colonne 3 - Company *}
                <div class="col-md-3 mb-4 mb-md-0">
                    <h5 style="color: var(--kmer-text); font-weight: 600; margin-bottom: 1rem;">
                        Company
                    </h5>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="{$WEB_ROOT}/index.php?rp=/knowledgebase" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;">
                                {lang key="knowledgebase"}
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="{$WEB_ROOT}/contact.php" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;">
                                {lang key="contactus"}
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="{$WEB_ROOT}/index.php?rp=/announcements" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;">
                                {lang key="announcements"}
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="{$WEB_ROOT}/submitticket.php" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;">
                                {lang key="support"}
                            </a>
                        </li>
                    </ul>
                </div>

                {* Colonne 4 - Contact *}
                <div class="col-md-3">
                    <h5 style="color: var(--kmer-text); font-weight: 600; margin-bottom: 1rem;">
                        Contact
                    </h5>
                    <ul class="list-unstyled" style="color: var(--kmer-text-secondary); font-size: 0.9rem;">
                        <li class="mb-2">
                            <i class="far fa-envelope mr-2" style="color: var(--kmer-primary);"></i>
                            info@kmerhosting.cm
                        </li>
                        <li class="mb-2">
                            <i class="far fa-phone mr-2" style="color: var(--kmer-primary);"></i>
                            +237 XXX XXX XXX
                        </li>
                        <li class="mb-2">
                            <i class="far fa-map-marker-alt mr-2" style="color: var(--kmer-primary);"></i>
                            Yaounde, Cameroon
                        </li>
                        <li class="mb-2">
                            <i class="far fa-clock mr-2" style="color: var(--kmer-primary);"></i>
                            24/7 Support Available
                        </li>
                    </ul>
                </div>
            </div>

            {* Footer Bottom *}
            <div class="pt-4" style="border-top: 1px solid var(--kmer-border);">
                <div class="d-md-flex justify-content-between align-items-center">
                    {* Copyright *}
                    <p class="mb-3 mb-md-0 text-center text-md-left" style="color: var(--kmer-text-secondary); font-size: 0.875rem;">
                        © {$date_year} {$companyname}. All rights reserved.
                    </p>

                    {* Links et Language/Currency Selector *}
                    <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                        {* Legal Links *}
                        <div class="mb-2 mb-md-0 mr-md-4">
                            {if $acceptTOS}
                                <a href="{$tosURL}" target="_blank" style="color: var(--kmer-text-secondary); font-size: 0.875rem; text-decoration: none; margin: 0 0.75rem;">
                                    {lang key='ordertos'}
                                </a>
                            {/if}
                            <a href="{$WEB_ROOT}/index.php?rp=/knowledgebase" style="color: var(--kmer-text-secondary); font-size: 0.875rem; text-decoration: none; margin: 0 0.75rem;">
                                Privacy Policy
                            </a>
                        </div>

                        {* Language & Currency Selector *}
                        {if $languagechangeenabled && count($locales) > 1 || $currencies}
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#modalChooseLanguage" style="border-color: var(--kmer-border); color: var(--kmer-text);">
                                <div class="d-inline-block align-middle mr-1">
                                    <div class="iti-flag {if $activeLocale.countryCode === '001'}us{else}{$activeLocale.countryCode|lower}{/if}"></div>
                                </div>
                                {$activeLocale.localisedName}
                                /
                                {$activeCurrency.prefix}
                                {$activeCurrency.code}
                            </button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </footer>

    {* Full Page Overlay *}
    <div id="fullpage-overlay" class="w-hidden">
        <div class="outer-wrapper">
            <div class="inner-wrapper">
                <img src="{$WEB_ROOT}/assets/img/overlay-spinner.svg" alt="">
                <br>
                <span class="msg"></span>
            </div>
        </div>
    </div>

    {* Modal Ajax *}
    <div class="modal system-modal fade" id="modalAjax" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">{lang key='close'}</span>
                    </button>
                </div>
                <div class="modal-body">
                    {lang key='loading'}
                </div>
                <div class="modal-footer">
                    <div class="float-left loader">
                        <i class="fas fa-circle-notch fa-spin"></i>
                        {lang key='loading'}
                    </div>
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        {lang key='close'}
                    </button>
                    <button type="button" class="btn btn-primary modal-submit">
                        {lang key='submit'}
                    </button>
                </div>
            </div>
        </div>
    </div>

    {* Modal Language/Currency Selection *}
    <form method="post" action="{$currentpagelinkback}">
        <div class="modal modal-localisation" id="modalChooseLanguage" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        {if $languagechangeenabled && count($locales) > 1}
                            <h2>{lang key='chooselanguage'}</h2>

                            <ul class="language-selector">
                                {foreach $locales as $locale}
                                    <li>
                                        <button type="submit" name="language" value="{$locale.language}" class="btn btn-block{if $locale.language eq $activeLocale.language} active{/if}">
                                            <div class="iti-flag {if $locale.countryCode === '001'}us{else}{$locale.countryCode|lower}{/if}"></div>
                                            {$locale.localisedName}
                                        </button>
                                    </li>
                                {/foreach}
                            </ul>
                        {/if}

                        {if $currencies}
                            <h2 class="mt-5">{lang key='choosecurrency'}</h2>

                            <ul class="currency-selector">
                                {foreach $currencies as $currency}
                                    <li>
                                        <button type="submit" name="currency" value="{$currency.id}" class="btn btn-block{if $currency.id eq $activeCurrency.id} active{/if}">
                                            {$currency.prefix} {$currency.code}
                                        </button>
                                    </li>
                                {/foreach}
                            </ul>
                        {/if}

                    </div>
                </div>
            </div>
        </div>
    </form>

{$footeroutput}

</body>
</html>
