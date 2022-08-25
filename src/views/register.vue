<template>
  <div class="register">
    <div class="top">
      <div class="logo">
        <router-link to="/index"><img src="../assets/img/logo.png" alt=""></router-link>
        <router-link to="/accountSearch" class="fr">账号审批查询</router-link>
      </div>
    </div>
    <div class="mid">
      <div class="stepContent">
        <p>想要注册成为供应商？<router-link to="/storeRegister">点击这里</router-link></p>
        <div class="form">
          <div class="title">联系人信息</div>
          <el-form label-width="150px">
            <el-form-item label="联系人姓名">
              <el-input v-model="form.contactPerson" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话">
              <el-input v-model="form.contactMobile" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="联系人身份证号">
              <el-input v-model="form.idNumber" placeholder="请输入联系人身份证号"></el-input>
            </el-form-item>
            <el-form-item label="审核信息" class="clear">
              <div class="uploadImg">
                <h1><i class="el-icon-upload"></i>资料审核</h1>
                <input type="file" @change="uploadImg('authorizationImg', $event)" accept="image/*">
                <img v-show="form.authorizationImg != ''" :src="form.authorizationImg" alt="">
                <span v-show="form.authorizationImg != ''" class="el-icon-error" @click="uploadImgEmpty('authorizationImg')"></span>
              </div>
              <div class="uploadImg">
                <h1><i class="el-icon-upload"></i>营业执照</h1>
                <input type="file" @change="uploadImg('businessLicenseImg', $event)" accept="image/*">
                <img v-show="form.businessLicenseImg != ''" :src="form.businessLicenseImg" alt="">
                <span v-show="form.businessLicenseImg != ''" class="el-icon-error" @click="uploadImgEmpty('businessLicenseImg')"></span>
              </div>
              <div class="uploadImg">
                <h1><i class="el-icon-upload"></i>开户许可证</h1>
                <input type="file" @change="uploadImg('accountOpenImg', $event)" accept="image/*">
                <img v-show="form.accountOpenImg != ''" :src="form.accountOpenImg" alt="">
                <span v-show="form.accountOpenImg != ''" class="el-icon-error" @click="uploadImgEmpty('accountOpenImg')"></span>
              </div>
              <a href="./file/资料审核模板.docx" download="资料审核模板" style="line-height: 100px;color: #409eff;"><i class="el-icon-download" style="margin-right: 5px;"></i>资料审核模板下载</a>
            </el-form-item>
          </el-form>
        </div>
        <div class="form">
          <div class="title">开票信息</div>
          <el-form label-width="150px">
            <el-form-item label="企业名称">
              <el-input v-model="form.name" placeholder="请输入企业名称"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码">
              <el-input v-model="form.businessLicense" placeholder="请输入统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名">
              <el-input v-model="form.legalPerson" placeholder="请输入法人姓名"></el-input>
            </el-form-item>
            <el-form-item label="企业地址">
              <el-input v-model="form.address" placeholder="请输入企业地址"></el-input>
            </el-form-item>
            <el-form-item label="企业电话">
              <el-input v-model="form.mobile" placeholder="请输入企业电话"></el-input>
            </el-form-item>
            <el-form-item label="开户行名称">
              <el-input v-model="form.openingBankName" placeholder="请输入开户行名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行账号">
              <el-input v-model="form.openingBankAccount" placeholder="请输入开户行账号"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
              <h1 style="color: #e74c3c;">注意：该邮箱为接收发票的电子邮箱，请谨慎填写</h1>
            </el-form-item>
          </el-form>
        </div>
        <div class="form">
          <div class="title">账号信息</div>
          <el-form label-width="150px">
            <el-form-item label="登录账号">
              <el-input v-model="form.loginAccount" placeholder="请输入登录账号"></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input type="password" v-model="form.loginPass" placeholder="请输入登录密码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="operate">
          <el-form>
            <el-form-item>
              <el-checkbox v-model="agreeRegister">我已阅读并同意<a href="javascript:;" @click="show = true" style="color: #409eff;">《客户注册协议》</a></el-checkbox>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="submit">提交信息，完成注册</el-button>
        </div>
      </div>
    </div>
    <!-- 客户注册协议 -->
    <Dialog :show.sync="show" title="客户注册协议" :btns="['确定', '取消']" height="80%" @dialogOperate="dialogOperate">
      <div slot="vNode" style="padding: 25px;">
        <p style="text-align:center">
          <span style="font-size:29px;font-family:黑体">万家寨水控集团——水控易购商城</span>
        </p>
        <p style="text-align:center">
          <span style="font-size:29px;font-family:黑体">用户协议</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">一、服务条款的确认及接受</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">1</span><span style="font-size:21px;font-family:仿宋">、本网站（指https：//www.wjzsc.cn，以下称“本网站”）各项电子服务的所有权和运作权归属于本网站所有，本网站提供的服务将完全按照其发布的服务条款和操作规则严格执行。您确认所有服务条款并完成注册程序时，本协议在您与本网站间成立并发生法律效力，同时您成为本网站正式用户。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">2</span><span style="font-size:21px;font-family:仿宋">、根据国家法律法规变化及本网站运营需要，本网站有权对本协议条款及相关规则不时地进行修改，修改后的内容一旦以任何形式公布在本网站上即生效，并取代此前相关内容，您应不时关注本网站公告、提示信息及协议、规则等相关内容的变动。您知悉并确认，如您不同意更新后的内容，应立即停止使用本网站；如您继续使用本网站，即视为知悉变动内容并同意接受。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">二、服务需知</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">1</span><span style="font-size:21px;font-family:仿宋">、本网站运用自身开发的操作系统通过国际互联网络为用户提供购买商品等服务。使用本网站，您必须：</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（1）自行配备上网的所需设备，包括手机、平板电脑、调制解调器、路由器等；</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（2）自行负担上网所支付的与此服务有关的电话费用、网络费用等；</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">2</span><span style="font-size:21px;font-family:仿宋">、基于本网站所提供的网络服务的重要性，您确认并同意：</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（1）提供的注册资料真实、准确、完整、合法有效，注册资料如有变动的，应及时更新；</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（2）如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且本网站保留终止您使用本网站各项服务的权利；</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（3）按照授权书模板，上传授权书, 提供的授权书须真实、合法、有效；</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（4）一方的送达地址或送达电子邮箱需要变更时应当履行通知义务，可通过信件/邮件/电话/短信的方式对另一方进行通知，更改后经审核通过，原信息将被替换删除。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（5）除法律法规规定外，您有权随时访问和更正您的用户信息，具体包括账户信息、收货信息、订单信息、浏览信息、发票信息、档案信息。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（6）对于您在使用我们的产品与/或服务过程中产生的其他信息需要访问或更正，请随时联系我们。我们会及时响应您的请求。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（7）您无法访问和更正的信息：除上述列明的信息外，您的部分信息我们还无法为您提供访问和更正的服务，这些信息主要是为了提升您的用户体验和保证交易安全所收集的您的设备信息、您使用附加功能时产生的信息。上述信息我们会在您的授权范围内进行使用，您无法访问和更正，但您可联系我们进行删除或做匿名化处理。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">三、订单</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">1</span><span style="font-size:21px;font-family:仿宋">、在您使用本网站下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人的行为和意思表示视为您的行为和意思表示，您应对收货人的行为及意思表示的法律后果承担连带责任。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">2</span><span style="font-size:21px;font-family:仿宋">、您理解并同意：本网站上销售商展示的商品和价格等信息仅仅是要约邀请，您下单时须填写您希望购买的商品数量、价款、收货人、联系方式、收货地址（履行地点）、履行方式等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向本网站发出的要约；本网站收到您的订单信息后，只有在本网站将您在订单中订购的商品从仓库实际直接向您发出时（以商品出库为标志），方视为您与本网站之间就实际直接向您发出的商品建立了关系；如果您在一份订单里订购了多种商品并且本网站只给您发出了部分商品时，您与本网站之间仅就实际直接向您发出的商品建立了关系，只有在本网站实际直接向您发出了订单中订购的其他商品时，您和本网站之间就订单中其他已实际直接向您发出的商品才成立关系。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">3</span><span style="font-size:21px;font-family:仿宋">、尽管本网站做出最大的努力，但由于市场变化及各种以合理商业努力难以控制因素的影响，本网站无法避免您提交的订单信息中的商品出现缺货、价格标示错误等情况；如您下单所购买的商品出现以上情况，您有权取消订单，本网站亦有权自行取消订单，若您已经付款，则为您办理退款。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">四、配送和交付</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">1</span><span style="font-size:21px;font-family:仿宋">、您在本网站购买的商品将按照本网站上您所指定的送货地址进行配送。订单信息中列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。您应当清楚准确地填写您的送货地址、联系人及联系方式等配送信息，您知悉并确认，您所购买的商品应仅由您填写的联系人接受身份查验后接收商品，因您变更联系人或相关配送信息而造成的损失由您自行承担。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">2</span><span style="font-size:21px;font-family:仿宋">、因如下情况造成订单延迟或无法配送等，本网站将无法承担迟延配送或无法配送的责任：</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（1）客户提供错误信息和不详细的地址；</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（2）货物送达无人签收或拒收，由此造成的重复配送所产生的费用及相关的后果；</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">（3）不可抗力，例如：自然灾害及恶劣天气、交通戒严等政府、司法机关的行为、决定或命令、意外交通事故、罢工、法规政策的修改、恐怖事件、抢劫、抢夺等暴力犯罪、突发战争等。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">&nbsp;</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">3</span><span style="font-size:21px;font-family:仿宋">、本网站依您订单确定的收货信息配送至指定地点并向指定收货人交付，商品一经签收即视为交付，您应当场对商品品类、规格、型号、数量和包装等商品表面状况进行验收。您应及时收取货物，非因确实可证的质量问题不退换货。如您对商品质量有异议的，应于商品交付后及时内向本网站提出，本网站根据实际情况及时处理。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">4</span><span style="font-size:21px;font-family:仿宋">、您在本网站购买的商品由包括京东、邮政等，以下称“配送公司”为您完成订单交付的，系统或单据记录的签收时间为交付时间；您购买的商品采用在线传输方式交付的，本网站向您指定系统发送的时间为交付时间；您购买服务的，生成的电子或者实物凭证中载明的时间为交付时间。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">五、售后服务</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">本网站依据国家相关规定、厂家规定提供相关售后服务。您作为企业客户，如因质量或物流产生的运损问题，适用“七天无理由退货”规则。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">六、结算方式和发票</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">1</span><span style="font-size:21px;font-family:仿宋">、本网站实行货到付款。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">2</span><span style="font-size:21px;font-family:仿宋">、您应保证提交的开票信息及付款信息的真实性与准确性，并保证实际付款方与申请开票方一致，否则造成的一切损失由您自行承担，给本网站造成实际损失的，您应承担相应赔偿责任。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">3</span><span style="font-size: 21px;font-family:仿宋">、收到货物请您及时确认收货，超过7日未确认（以物流签收信息为准），本网站则默认确认收货。 </span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">4</span><span style="font-size: 21px;font-family:仿宋">、您收到发票后应及时跟本网站确认发票送达情况，超过7日未核实，则视为您已确认收到发票。您应及时就已要求开具增值税专用发票进行认证抵扣，如因您的原因超期未抵扣，由此产生全部责任或损失均由您承担。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">5</span><span style="font-size: 21px;font-family:仿宋">、收到发票后，请您于7日内完成付款义务。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">七、违约责任</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">1</span><span style="font-size:21px;font-family:仿宋">、如您未能按约定，如期完成付款义务，本网站将按月息1%收取违约金。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">2</span><span style="font-size:21px;font-family:仿宋">、针对您的批量采购或定制商品需求，本网站开展备货行为后，如您未经本网站书面同意擅自取消采购需求或订单等违约行为，由此产生全部责任或损失均由您承担。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">3</span><span style="font-size:21px;font-family:仿宋">、您应妥善保管本协议项下账户名及密码信息，如因为您擅自将账户名及密码信息转让、授权、赠与或因保管不善等任何其它原因导致任何其它人使用的，您需自行对其账户项下的一切行为独立承担责任。同时本网站在该种情况下有权做出独立判断，可采取暂停或关闭您参与资格等措施。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">4</span><span style="font-size:21px;font-family:仿宋">、您通过本网站采购的商品不得销售给任何其他分销商或经销商，若产生与任何本协议外第三方的争议均由您自行解决，给本网站造成实际损失的，您应承担相应赔偿责任。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">5</span><span style="font-size:21px;font-family:仿宋">、如果本网站发现或收到他人投诉举报您违反法律法规、违反本协议约定或存在任何恶意行为的，本网站有权终止服务，用户自行承担相关法律责任。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">6</span><span style="font-size:21px;font-family:仿宋">、除非另有明确的书面说明,本网站不对运营及其包含在本网站上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">八、所有权及知识产权</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">1</span><span style="font-size:21px;font-family:仿宋">、您一旦接受本协议，即表明您主动将您在任何时间段在本网站发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给本网站所有，并且您同意本网站有权就任何主体侵权而单独提起诉讼。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">2</span><span style="font-size:21px;font-family:仿宋">、本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2010年修订版《著作权法》确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于您在本网站上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">3</span><span style="font-size:21px;font-family:仿宋">、您同意并已充分了解本协议的条款，承诺不将已发表于本网站的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">4</span><span style="font-size:21px;font-family:仿宋">、除法律另有强制性规定外，未经本网站明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本网站的信息内容，否则，本网站有权追究其法律责任。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">5</span><span style="font-size:21px;font-family:仿宋">、本网站所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是本网站或其内容提供者的财产，受中国和国际版权法的保护。本网站上所有内容的汇编是本网站的排他财产，受中国和国际版权法的保护。本网站上所有软件都是本网站或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">九、保密义务</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">1</span><span style="font-size:21px;font-family:仿宋">、本协议任一方（以下简称“获取方”）对于本协议的签订、内容及在履行本协议期间所获知的相对方（以下简称“披露方”）的商业秘密负有保密义务。非经披露方书面同意，不得向任何第三方泄露、给予或转让该等保密信息。（依据法律法规、证券交易所规则向政府、证券交易所和/或其他监管机构提供、协议方的法律、会计、商业及其他顾问、雇员等提供的除外）。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">2</span><span style="font-size:21px;font-family:仿宋">、如披露方提出要求，获取方应将单独载有披露方保密信息的任何文件、资料或软件等，在本协议终止后按照披露方的要求归还、销毁，或进行其他处置，不得继续使用或复制、留存。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">3</span><span style="font-size:21px;font-family:仿宋">、本协议履行期间及终止后，双方均需履行本协议项下保密义务，直至披露方同意获取方解除此项义务，或事实上不会因获取方违反本协议的保密条款而给披露方造成任何形式的损害时止，包括但不限于保密信息已经由披露方向公众披露的情形等。</span>
        </p>
        <p style=";margin-bottom:0;text-align:justify;text-justify: inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">4</span><span style="font-size:21px;font-family:仿宋">、协议双方均应告知并督促其因履行本协议之目的而必须获知本协议内容及因合作而获知对方商业秘密的雇员、代理人等遵守保密条款，并对其雇员、代理人等的行为承担连带责任。</span>
        </p>
        <p>
          <br/>
        </p>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import Dialog from "../components/Dialog/Dialog";

  export default {
    name: "register",
    components: {
      Dialog
    },
    data() {
      return {
        show: false,
        agreeRegister: false,
        form: {
          contactPerson: '',
          contactMobile: '',
          email: '',
          idNumber: '',
          authorizationImg: '',
          businessLicenseImg: '',
          accountOpenImg: '',
          name: '',
          legalPerson: '',
          businessLicense: '',
          address: '',
          mobile: '',
          openingBankName: '',
          openingBankAccount: '',
          loginAccount: '',
          loginPass: ''
        },
        formCheckKeys: {
          contactPerson: '',
          contactMobile: '',
          email: '',
          idNumber: '',
          authorizationImg: '',
          businessLicenseImg: '',
          accountOpenImg: '',
          name: '',
          legalPerson: '',
          loginAccount: '',
          loginPass: ''
        }
      }
    },
    methods: {
      submitEmpty() {
        let bool = true
        for (let v of Object.keys(this.formCheckKeys)) {
          if (this.form[v] == '') {
            bool = false
          }
        }
        return bool;
      },
      submit() {
        if (!this.submitEmpty()) {
          this.$message.error('请将注册信息填写完整')
        } else if (!this.agreeRegister) {
          this.$message.error('请同意协议并勾选')
        } else {
          this.show = true
        }
      },
      uploadImg(prop, event) {
        const file = event.target.files[0]
        if (file.size < (1024 * 1000 * 3)) {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            this.form[prop] = e.target.result
          }
        } else {
          this.$message.error('上传的图片大小不能超过3MB')
        }
      },
      uploadImgEmpty(prop) {
        this.form[prop] = ''
      },
      dialogOperate(index) {
        if (index == 0) {
          if (this.agreeRegister) {
            const loading = this.$loading({
              lock: true,
              text: '信息提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            let sendData = {}
            Object.assign(sendData, this.form)
            sendData.loginPass = md5(sendData.loginPass)
            sendData.code = '123456'
            this.$post('reg/customerReg', sendData).then(res => {
              this.$message({
                message: res.msg,
                type: 'info',
                duration: 1500,
                onClose: () => {
                  loading.close();
                  this.show = false
                  if (res.code == 0) {
                    this.$router.push({
                      path: '/index'
                    })
                  }
                }
              })
            })
          } else {
            this.agreeRegister = true
            this.show = false
          }
        }
      }
    }
  }
</script>

<style lang="less">
  .register{
    .top{background: #fff;padding: 20px 0;box-shadow: 0 0 40px -10px rgb(64, 158, 255, .01);
      .logo{width: 1200px;height: 50px;margin: 0 auto;
        img{height: 100%;}
        a{font-size: 18px;font-weight: bold;line-height: 50px;color: #333;}
      }
    }
    .mid{width: 1200px;margin: 30px auto;background: #fff;padding: 30px 50px;
      .step{width: 100%;height: 66px;background: #f1f1f1;color: #999;overflow: hidden;
        li{width: 25%;float: left;text-align: center;line-height: 66px;position: relative;
          span{display: inline-block;width: 36px;height: 36px;line-height: 34px;border: 1px solid #999;text-align: center;border-radius: 50%;margin-right: 8px;}
          b{font-weight: normal;font-size: 16px;}
        }
        .active{
          span{background: #006DB8;color: #fff;border: 1px solid #006DB8;}
          b{color: #333;}
        }
        li:not(:last-child)::after{content: '';position: absolute;top: 50%;right: 0;transform: rotate(45deg) translateY(-50%);border: 1px solid #999;width: 12px;height: 12px;border-left: none;border-bottom: none;}
      }
      p{text-align: right;
        a{color: #006DB8;text-decoration: underline;}
      }
      .form{border: 1px solid #f1f1f1;margin: 30px 0;padding: 30px;
        .title{font-size: 18px;font-weight: bold;margin-bottom: 30px;}
        .el-form-item{margin-bottom: 30px;
          .uploadImg{width: 100px;height: 100px;border: 1px dashed #ddd;position: relative;float: left;margin-right: 30px;
            h1{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 100%;text-align: center;
              i{margin-right: 5px;}
            }
            input{width: 100%;height: 100%;position: absolute;top: 0;left: 0;opacity: 0;cursor: pointer;z-index: 10;}
            img{position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 9;}
            span{position: absolute;top: 5px;right: 5px;z-index: 10;color: #F56C6C;font-size: 18px;cursor: pointer;}
          }
        }
      }
      .operate{overflow: hidden;
        button{float: right;}
      }
    }
  }
</style>