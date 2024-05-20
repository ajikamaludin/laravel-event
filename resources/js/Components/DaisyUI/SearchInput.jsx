import { HiSearch } from 'react-icons/hi'
import TextInput from './TextInput'

export default function SearchInput({ onChange, value }) {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiSearch className="text-base" />
            </div>
            <TextInput
                placeholder="cari"
                className="pl-10"
                onChange={onChange}
                value={value}
                autoComplete="off"
            />
        </div>
    )
}
