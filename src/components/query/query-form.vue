<template>
  <div>
    <!--简单查询区域-->
    <div>
      <div>
        <Select v-model="simple.current" style="width: 160px">
          <Option
            v-for="(item, index) in simple.data"
            :key="index"
            :value="item.name"
            >{{ item.title }}</Option
          >
        </Select>
        <!--输入框搜索-->
        <Input
          v-if="simpleQueryCurrent && simpleQueryCurrent.type === 'input'"
          :placeholder="
            !simpleQueryCurrent || !simpleQueryCurrent.placeholder
              ? '请选择搜索条件'
              : simpleQueryCurrent.placeholder
          "
          v-model="simpleQueryCurrent.data"
          style="width: 600px"
          autofocus
          clearable
        ></Input>

        <Button style="margin-left: 10px" type="primary" @click="doQuery"
          >查询</Button
        >
        <Button style="margin-left: 6px" type="default" @click="switchQuery">{{
          complex.open ? '快速搜索' : '更多搜索'
        }}</Button>
      </div>
    </div>

    <!--标签查询区域-->
    <div style="margin-top: 10px">
      <Row>
        <Col span="24">
          <span v-for="item in quick.data" :key="item.name">
            <RadioGroup
              @on-change="doQuery"
              v-if="item.type === 'radio'"
              style="margin-right: 10px"
              type="button"
              size="small"
              v-model="item.data"
            >
              <div v-if="item.options">
                <Radio
                  v-for="itemRadio in item.options"
                  :label="itemRadio.value"
                  :key="itemRadio.value"
                  >{{ itemRadio.title }}</Radio
                >
              </div>
            </RadioGroup>
          </span>
        </Col>
      </Row>
    </div>

    <!--高级查询区域-->
    <div v-if="complex.open" style="margin-top: 10px">
      <Row
        :gutter="16"
        style="margin-top: 10px"
        v-for="group in complex.data"
        :key="group.id"
      >
        <Col span="8" v-for="item in group.items" :key="item.name">
          <Input
            :placeholder="item.placeholder"
            width="auto"
            v-model="item.data"
            v-if="item.type === 'input'"
          >
            <p slot="prepend">{{ item.title }}</p>
          </Input>

          <span v-if="item.type === 'radio'">
            <RadioGroup
              @on-change="doQuery"
              style="margin-right: 10px"
              type="button"
              v-model="item.data"
            >
              <Radio disabled>{{ item.title }}</Radio>
              <Radio
                v-for="itemRadio in item.options"
                :label="itemRadio.value"
                :key="itemRadio.value"
                >{{ itemRadio.title }}</Radio
              >
            </RadioGroup>
          </span>

          <Row v-if="item.type === 'select'">
            <Col>
              <span style="margin-right: 10px">{{ item.title }}</span>
              <Select
                v-model="item.data"
                width="auto"
                v-if="item.type === 'select'"
                @on-change="doQuery"
                clearable
              >
                <Option
                  v-for="itemDropdown in item.options"
                  :value="itemDropdown.value"
                  :key="itemDropdown.value"
                  >{{ itemDropdown.title }}</Option
                >
              </Select>
            </Col>
          </Row>

          <Row v-if="item.type === 'date'">
            <Col>
              <span style="margin-right: 10px">{{ item.title }}:</span>
              <DatePicker
                v-model="item.data"
                format="yyyy年MM月dd日"
                type="date"
                placeholder="选择日期"
                style="width: 200px"
              ></DatePicker>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>

    <!--查询条件展示区域-->
    <div style="margin-top: 10px" v-if="result.data.length > 0">
      <Row>
        <Col>
          <Icon type="ios-funnel" style="margin-right: 10px" />
          <Tag
            color="default"
            closable
            v-for="item in result.data"
            :key="item.name"
            @on-close="cleanQueryItem(item.name)"
          >
            <span v-if="item.type === 'date'"
              >{{ item.title }}:{{ item.data | dayFormat }}</span
            >
            <span v-else
              >{{ item.title }}:{{ item.dataLabel || item.data }}</span
            >
          </Tag>
          <a
            style="margin-left: 8px; color: #999; font-size: 12px"
            href="javascript:void(0)"
            @click="cleanQuery"
            >清除</a
          >
        </Col>
      </Row>
    </div>
  </div>
</template>

<script src='./query-form.js'></script>
