                    </div>

                    </div>
                    {if !$inShoppingCart && $secondarySidebar->hasChildren()}
                        <div class="d-lg-none sidebar sidebar-secondary">
                            {include file="$template/includes/sidebar.tpl" sidebar=$secondarySidebar}
                        </div>
                    {/if}
                <div class="clearfix"></div>
            </div>
        </div>
    </section>

    <footer id="footer" class="footer" style="background: var(--kmer-bg-secondary); border-top: 1px solid var(--kmer-border); padding: 4rem 0 2rem; margin-top: 4rem;">
        <div class="container">
            <div class="row mb-5">
                <div class="col-md-3 mb-4 mb-md-0">
                    <h4 style="color: var(--kmer-primary); font-weight: 700; margin-bottom: 1rem;">{$companyname}</h4>
                    <p style="color: var(--kmer-text-secondary); font-size: 0.9rem;">Reliable web hosting solutions for Cameroon businesses and individuals.</p>
                    <div class="mt-3">
                        {include file="$template/includes/social-accounts.tpl"}
                    </div>
                </div>
                <div class="col-md-3 mb-4 mb-md-0">
                    <h5 style="color: var(--kmer-text); font-weight: 600; margin-bottom: 1rem;">Hébergement</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="https://kmerhosting.com/customers/store/cpanel-shared-hosting" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#128C7E'" onmouseout="this.style.color='var(--kmer-text-secondary)'">cPanel Shared Hosting</a></li>
                        <li class="mb-2"><a href="https://kmerhosting.com/customers/store/directadmin-shared-hosting" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#128C7E'" onmouseout="this.style.color='var(--kmer-text-secondary)'">DirectAdmin Shared Hosting</a></li>
                        <li class="mb-2"><a href="https://kmerhosting.com/customers/store/cpanel-reseller-hosting" style="color: var(--kmer-text-secondary); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#128C7E'" onmouseout="this.style.color='var(--kmer-text-secondary)'">cPanel Reseller Hosting</a></li>
                    </ul>
                </div>
                <div class="col-md-3 mb-4 mb-md-0">
                    <h5 style="color: var(--kmer-text); font-weight: 600; margin-bottom: 1rem;">Company</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="{$WEB_ROOT}/index.php?rp=/knowledgebase" style="color: var(--kmer-text-secondary); text-decoration: none;">{lang key="knowledgebase"}</a></li>
                        <li class="mb-2"><a href="{$WEB_ROOT}/contact.php" style="color: var(--kmer-text-secondary); text-decoration: none;">{lang key="contactus"}</a></li>
                        <li class="mb-2"><a href="{$WEB_ROOT}/submitticket.php" style="color: var(--kmer-text-secondary); text-decoration: none;">{lang key="support"}</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h5 style="color: var(--kmer-text); font-weight: 600; margin-bottom: 1rem;">Contact</h5>
                    <ul class="list-unstyled" style="color: var(--kmer-text-secondary); font-size: 0.9rem;">
                        <li class="mb-2"><i class="far fa-envelope mr-2" style="color: var(--kmer-primary);"></i> info@kmerhosting.cm</li>
                        <li class="mb-2"><i class="far fa-map-marker-alt mr-2" style="color: var(--kmer-primary);"></i> Cameroon</li>
                        <li class="mb-2"><i class="far fa-clock mr-2" style="color: var(--kmer-primary);"></i> 24/7 Support</li>
                    </ul>
                </div>
            </div>

            <div class="pt-4" style="border-top: 1px solid var(--kmer-border);">
                <div class="d-md-flex justify-content-between align-items-center">
                    <p class="mb-3 mb-md-0 text-center text-md-left" style="color: var(--kmer-text-secondary); font-size: 0.875rem;">© {$date_year} {$companyname}. All rights reserved.</p>
                    <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                        <div class="mb-2 mb-md-0 mr-md-4">
                            {if $acceptTOS}<a href="{$tosURL}" target="_blank" style="color: var(--kmer-text-secondary); font-size: 0.875rem; text-decoration: none; margin: 0 0.75rem;">{lang key='ordertos'}</a>{/if}
                        </div>
                        {if $languagechangeenabled && count($locales) > 1 || $currencies}
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#modalChooseLanguage" style="border-color: var(--kmer-border); color: var(--kmer-text);">
                            <div class="d-inline-block align-middle mr-1"><div class="iti-flag {if $activeLocale.countryCode === '001'}us{else}{$activeLocale.countryCode|lower}{/if}"></div></div>
                            {$activeLocale.localisedName} / {$activeCurrency.prefix} {$activeCurrency.code}
                        </button>
                        {/if}
                    </div>
                </div>
            </div>

            <ul class="list-inline mb-7 text-center float-lg-right" style="display:none;">
                {include file="$template/includes/social-accounts.tpl"}

                {if $languagechangeenabled && count($locales) > 1 || $currencies}
                    <li class="list-inline-item">
                        <button type="button" class="btn" data-toggle="modal" data-target="#modalChooseLanguage">
                            <div class="d-inline-block align-middle">
                                <div class="iti-flag {if $activeLocale.countryCode === '001'}us{else}{$activeLocale.countryCode|lower}{/if}"></div>
                            </div>
                            {$activeLocale.localisedName}
                            /
                            {$activeCurrency.prefix}
                            {$activeCurrency.code}
                        </button>
                    </li>
                {/if}
            </ul>

        </div>
    </footer>

    <div id="fullpage-overlay" class="w-hidden">
        <div class="outer-wrapper">
            <div class="inner-wrapper">
                <img src="{$WEB_ROOT}/assets/img/overlay-spinner.svg" alt="">
                <br>
                <span class="msg"></span>
            </div>
        </div>
    </div>

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

    <form method="get" action="{$currentpagelinkback}">
        <div class="modal modal-localisation" id="modalChooseLanguage" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        {if $languagechangeenabled && count($locales) > 1}
                            <h5 class="h5 pt-5 pb-3">{lang key='chooselanguage'}</h5>
                            <div class="row item-selector">
                                <input type="hidden" name="language" data-current="{$language}" value="{$language}" />
                                {foreach $locales as $locale}
                                    <div class="col-4">
                                        <a href="#" class="item{if $language == $locale.language} active{/if}" data-value="{$locale.language}">
                                            {$locale.localisedName}
                                        </a>
                                    </div>
                                {/foreach}
                            </div>
                        {/if}
                        {if !$loggedin && $currencies}
                            <p class="h5 pt-5 pb-3">{lang key='choosecurrency'}</p>
                            <div class="row item-selector">
                                <input type="hidden" name="currency" data-current="{$activeCurrency.id}" value="">
                                {foreach $currencies as $selectCurrency}
                                    <div class="col-4">
                                        <a href="#" class="item{if $activeCurrency.id == $selectCurrency.id} active{/if}" data-value="{$selectCurrency.id}">
                                            {$selectCurrency.prefix} {$selectCurrency.code}
                                        </a>
                                    </div>
                                {/foreach}
                            </div>
                        {/if}
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default">{lang key='apply'}</button>
                    </div>
                </div>
            </div>
        </div>
    </form>

    {if !$loggedin && $adminLoggedIn}
        <a href="{$WEB_ROOT}/logout.php?returntoadmin=1" class="btn btn-return-to-admin" data-toggle="tooltip" data-placement="bottom" title="{if $adminMasqueradingAsClient}{lang key='adminmasqueradingasclient'} {lang key='logoutandreturntoadminarea'}{else}{lang key='adminloggedin'} {lang key='returntoadminarea'}{/if}">
            <i class="fas fa-redo-alt"></i>
            <span class="d-none d-md-inline-block">{lang key="admin.returnToAdmin"}</span>
        </a>
    {/if}

    {include file="$template/includes/generate-password.tpl"}

    {$footeroutput}

</body>
</html>
