import React from 'react';
import {
    ListView,
    View,
    UIManager,
    Platform,
    findNodeHandle,
    Text,
    ScrollView,
} from 'react-native';

import SectionList from './SectionList';

interface IProps {
    sectionHeader: (...args: any) => React.ReactNode;
    renderRow: (...args: any) => any;
    contentOffset?: object;
    headerHeight?: number;
    rowHeight: number;
    sectionHeaderHeight: number;
    onScrollToSection?: (...args: any) => any;
    onScroll?: (...args: any) => any;
    data: any[] | object;
    style?: any;
}

interface IState {
    dataSource: any;
}

export class AZList extends React.Component<IProps, IState> {
    contentOffsetHandler: any;
    containerHeight: number;
    sectionItems: object;
    totalHeight: number;

    constructor(props: IProps) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (prev, next) => prev !== next,
            }),
        };

        this.sectionItems = {};
        this.containerHeight = 0;
        this.totalHeight = 0;
        this.calculateTotalHeight(this.props.data);
    }

    componentWillUnmount() {
        if (this.contentOffsetHandler) {
            clearTimeout(this.contentOffsetHandler);
        }
    }

    componentDidMount() {
        setImmediate(() => {
            UIManager.measure(
                // @ts-ignore
                findNodeHandle(this.refs.view),
                (_, __, ___, h) => {
                    this.containerHeight = h;
                }
            );
        });

        // trick to implement contentOffset on Android
        if (this.props.contentOffset && Platform.OS === 'android') {
            this.contentOffsetHandler = setTimeout(() => {
                (this.refs.listview as ScrollView).scrollTo(
                    this.props.contentOffset
                );
            }, 0);
        }
    }

    componentWillReceiveProps(nextProps: Partial<IProps>) {
        if (nextProps.data && nextProps.data !== this.props.data) {
            this.calculateTotalHeight(nextProps.data);
        }
    }

    calculateTotalHeight(data: object) {
        if (Array.isArray(data)) return;

        this.totalHeight = Object.keys(data).reduce((carry, key) => {
            const itemCount = data[key].children.length;
            let temp = carry;
            temp += itemCount * this.props.rowHeight;
            temp += this.props.sectionHeaderHeight;

            this.sectionItems![key] = itemCount;

            return temp;
        }, 0);
    }

    scrollToSection = (section: string) => {
        const headerHeight = this.props.headerHeight || 0;
        let yAxis = headerHeight;

        const { sectionHeaderHeight, rowHeight } = this.props;
        const keys = Object.keys(this.props.data);
        const index = keys.indexOf(section);

        let numcells = 0;
        for (let i = 0; i < index; i += 1) {
            numcells += this.props.data[keys[i]].children.length;
        }

        const sHeaderHeight = sectionHeaderHeight * index;
        const maxY = this.totalHeight - (this.containerHeight + headerHeight);
        yAxis += numcells * rowHeight + sHeaderHeight;
        yAxis = yAxis >= maxY ? maxY : Math.floor(yAxis * 1.165);

        (this.refs.listview as ScrollView).scrollTo({
            x: 0,
            y: yAxis,
            animated: true,
        });

        if (this.props.onScrollToSection) {
            this.props.onScrollToSection(section);
        }
    };

    renderSectionHeader = (_: any, sectionId: string) => {
        const Component = this.props.sectionHeader;
        const content = Component ? (
            // @ts-ignore
            <Component title={sectionId} />
        ) : (
            <Text>{sectionId}</Text>
        );

        return <View ref="view">{content}</View>;
    };

    onScroll = (e: any) => {
        if (this.props.onScroll) {
            this.props.onScroll(e);
        }
    };

    render() {
        const { data } = this.props;
        const dataIsArray = Array.isArray(data);
        const sections = Object.keys(data);
        let sectionList;
        let dataSource;

        if (dataIsArray) {
            dataSource = this.state.dataSource.cloneWithRows(data);
        } else {
            sectionList = (
                <SectionList
                    onSectionSelect={this.scrollToSection}
                    sections={sections}
                    data={data as []}
                />
            );

            dataSource = this.state.dataSource.cloneWithRowsAndSections(
                data,
                sections
            );
        }

        const props = {
            ...this.props,
            dataSource,
            renderSectionHeader: this.renderSectionHeader,
            onScroll: this.onScroll,
            renderRow: this.props.renderRow,
        };

        // @ts-ignore
        const listView = <ListView ref="listview" {...props} />;

        return (
            <View ref="view" style={[{ flex: 1 }, this.props.style]}>
                {listView}
                {sectionList}
            </View>
        );
    }
}
